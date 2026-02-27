"use client";

import { useEffect, useRef } from "react";

/**
 * SplashCursor Component
 * 
 * A premium global fluid simulation layer.
 * Re-architected for absolute stability, performance, and Zero-Error execution.
 */

interface SplashCursorProps {
    SIM_RES?: number;
    DYE_RES?: number;
    DENSITY_DISSIPATION?: number;
    VELOCITY_DISSIPATION?: number;
    PRESSURE?: number;
    PRESSURE_ITERATIONS?: number;
    CURL?: number;
    SPLAT_RADIUS?: number;
    SPLAT_FORCE?: number;
    SHADING?: boolean;
    PAUSED?: boolean;
    BACK_COLOR?: { r: number; g: number; b: number };
    TRANSPARENT?: boolean;
}

class Material {
    vertexShader: string;
    fragmentShader: string;
    programs: any[];

    constructor(vertexShader: string, fragmentShader: string) {
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.programs = [];
    }
}

class Program {
    uniforms: { [key: string]: WebGLUniformLocation | null };
    program: WebGLProgram;

    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        this.uniforms = {};
        const program = gl.createProgram();
        if (!program) throw new Error("Could not create program");
        this.program = program;
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            const info = gl.getProgramInfoLog(this.program);
            console.error("WebGL Program Link Error:", info);
            throw new Error(info || "Program Error");
        }

        const uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            const active = gl.getActiveUniform(this.program, i);
            if (active) {
                this.uniforms[active.name] = gl.getUniformLocation(this.program, active.name);
            }
        }
    }

    bind(gl: WebGLRenderingContext | WebGL2RenderingContext) {
        gl.useProgram(this.program);
    }
}

const SplashCursor = ({
    SIM_RES = 32,
    DYE_RES = 128,
    DENSITY_DISSIPATION = 0.98,
    VELOCITY_DISSIPATION = 0.98,
    PRESSURE = 0.8,
    PRESSURE_ITERATIONS = 8,
    CURL = 30,
    SPLAT_RADIUS = 0.25,
    SPLAT_FORCE = 6000,
    SHADING = true,
    PAUSED = false,
    BACK_COLOR = { r: 0, g: 0, b: 0 },
    TRANSPARENT = true,
}: SplashCursorProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const isMobile = window.innerWidth < 768;

        // Disable fluid simulation on mobile completely to prevent lag
        if (isMobile) return;

        const simRes = SIM_RES;
        const dyeRes = DYE_RES;
        const pressureIterations = PRESSURE_ITERATIONS;

        const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as (WebGLRenderingContext | WebGL2RenderingContext | null);
        if (!gl) return;

        const isWebGL2 = "WebGL2RenderingContext" in window && gl instanceof WebGL2RenderingContext;
        let halfFloat: any;
        let supportLinearFiltering: any;

        if (isWebGL2) {
            gl.getExtension("EXT_color_buffer_float");
            supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
        } else {
            halfFloat = gl.getExtension("OES_texture_half_float");
            supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
        }

        const halfFloatTexType = isWebGL2 ? (gl as any).HALF_FLOAT : halfFloat?.HALF_FLOAT_OES;

        const getSupportedFormat = (internalFormat: number, format: number, type: number): any => {
            if (!type || isNaN(type)) return { internalFormat: 6408, format: 6408 }; // RGBA fallback
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (status !== gl.FRAMEBUFFER_COMPLETE && isWebGL2) {
                const gl2 = gl as WebGL2RenderingContext;
                if (internalFormat === gl2.R16F) return getSupportedFormat(gl2.RG16F, gl2.RG, type);
                if (internalFormat === gl2.RG16F) return getSupportedFormat(gl2.RGBA16F, gl2.RGBA, type);
                return { internalFormat: gl.RGBA, format: gl.RGBA };
            }
            return { internalFormat, format };
        };

        const formatRGBA = isWebGL2 ? getSupportedFormat((gl as WebGL2RenderingContext).RGBA16F, gl.RGBA, halfFloatTexType) : getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
        const formatRG = isWebGL2 ? getSupportedFormat((gl as WebGL2RenderingContext).RG16F, (gl as WebGL2RenderingContext).RG, halfFloatTexType) : getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
        const formatR = isWebGL2 ? getSupportedFormat((gl as WebGL2RenderingContext).R16F, (gl as WebGL2RenderingContext).RED, halfFloatTexType) : getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);

        const ext = { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering };

        class Pointer {
            id = -1;
            texcoordX = 0;
            texcoordY = 0;
            prevTexcoordX = 0;
            prevTexcoordY = 0;
            deltaX = 0;
            deltaY = 0;
            moved = false;
            color = { r: 0, g: 0, b: 0 };
        }
        const pointers = [new Pointer()];

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                const info = gl.getShaderInfoLog(shader);
                console.error("Shader Compile Error:", info);
                throw new Error(info || "Shader Error");
            }
            return shader;
        };

        const createProgramFromSource = (vs: string, fs: string, kw: string[] | null) => {
            const addK = (s: string) => (kw && kw.length ? kw.map(k => "#define " + k + "\n").join("") : "") + s;
            const svs = createShader(gl.VERTEX_SHADER, addK(vs));
            const sfs = createShader(gl.FRAGMENT_SHADER, addK(fs));
            return new Program(gl, svs, sfs);
        };

        const setMaterialKeywords = (m: Material, kw: string[]) => {
            const name = kw.join("");
            for (let i = 0; i < m.programs.length; i += 2) if (m.programs[i] === name) return m.programs[i + 1];
            const p = createProgramFromSource(m.vertexShader, m.fragmentShader, kw);
            m.programs.push(name, p);
            return p;
        };

        const baseVS = `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv, vL, vR, vT, vB;
        uniform vec2 texelSize;
        void main() {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }`;

        const clearFS = `
        precision mediump float;
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;
        void main() {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }`;

        const splatFS = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio, radius;
        uniform vec3 color;
        uniform vec2 point;
        void main() {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 base = texture2D(uTarget, vUv).xyz;
            float splat = exp(-dot(p, p) / radius);
            gl_FragColor = vec4(base + splat * color, 1.0);
        }`;

        const curlFS = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv, vL, vR, vT, vB;
        uniform sampler2D uVelocity;
        void main() {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            gl_FragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
        }`;

        const vorticityFS = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv, vL, vR, vT, vB;
        uniform sampler2D uVelocity, uCurl;
        uniform float curl, dt;
        void main() {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;
            vec2 f = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            f /= length(f) + 0.0001;
            gl_FragColor = vec4(texture2D(uVelocity, vUv).xy + f * curl * C * dt, 0.0, 1.0);
        }`;

        const divergenceFS = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv, vL, vR, vT, vB;
        uniform sampler2D uVelocity;
        void main() {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;
            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) L = -C.x;
            if (vR.x > 1.0) R = -C.x;
            if (vT.y > 1.0) T = -C.y;
            if (vB.y < 0.0) B = -C.y;
            gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
        }`;

        const pressureFS = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv, vL, vR, vT, vB;
        uniform sampler2D uPressure, uDivergence;
        void main() {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float div = texture2D(uDivergence, vUv).x;
            gl_FragColor = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
        }`;

        const gradSubFS = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv, vL, vR, vT, vB;
        uniform sampler2D uPressure, uVelocity;
        void main() {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 v = texture2D(uVelocity, vUv).xy;
            gl_FragColor = vec4(v - 0.5 * vec2(R - L, T - B), 0.0, 1.0);
        }`;

        const advectionFS = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity, uSource;
        uniform vec2 texelSize;
        uniform float dt, dissipation;
        void main() {
            vec2 c = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
            gl_FragColor = dissipation * texture2D(uSource, c);
        }`;

        const displayFS = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv, vL, vR, vT, vB;
        uniform sampler2D uTexture;
        uniform vec2 texelSize;
        void main() {
            vec3 c = texture2D(uTexture, vUv).rgb;
            #ifdef SHADING
            float dx = length(texture2D(uTexture, vR).rgb) - length(texture2D(uTexture, vL).rgb);
            float dy = length(texture2D(uTexture, vT).rgb) - length(texture2D(uTexture, vB).rgb);
            c *= max(1.0 + dot(normalize(vec3(dx, dy, length(texelSize))), vec3(0.0, 0.0, 1.0)) * 0.7, 0.7);
            #endif
            gl_FragColor = vec4(pow(max(c, 0.0), vec3(1.0 / 2.2)), 1.0);
        }`;

        const clearP = createProgramFromSource(baseVS, clearFS, null);
        const splatP = createProgramFromSource(baseVS, splatFS, null);
        const curlP = createProgramFromSource(baseVS, curlFS, null);
        const vortP = createProgramFromSource(baseVS, vorticityFS, null);
        const divP = createProgramFromSource(baseVS, divergenceFS, null);
        const pressureP = createProgramFromSource(baseVS, pressureFS, null);
        const gradP = createProgramFromSource(baseVS, gradSubFS, null);
        const advectM = new Material(baseVS, advectionFS);
        const displayM = new Material(baseVS, displayFS);

        const createFBO = (w: number, h: number, internalFormat: number, format: number, type: number, param: number) => {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            return { texture, fbo, width: w, height: h, attach(id: number) { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; } };
        };
        const createDoubleFBO = (w: number, h: number, iF: number, f: number, t: number, p: number) => {
            let f1 = createFBO(w, h, iF, f, t, p), f2 = createFBO(w, h, iF, f, t, p);
            return { get read() { return f1; }, get write() { return f2; }, swap() { const t = f1; f1 = f2; f2 = t; } };
        };


        const dye = createDoubleFBO(dyeRes, dyeRes, ext.formatRGBA.internalFormat, ext.formatRGBA.format, ext.halfFloatTexType, gl.LINEAR);
        const vel = createDoubleFBO(simRes, simRes, ext.formatRG.internalFormat, ext.formatRG.format, ext.halfFloatTexType, gl.LINEAR);
        const div = createFBO(simRes, simRes, ext.formatR.internalFormat, ext.formatR.format, ext.halfFloatTexType, gl.NEAREST);
        const curl = createFBO(simRes, simRes, ext.formatR.internalFormat, ext.formatR.format, ext.halfFloatTexType, gl.NEAREST);
        const pres = createDoubleFBO(simRes, simRes, ext.formatR.internalFormat, ext.formatR.format, ext.halfFloatTexType, gl.NEAREST);

        const quadB = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quadB);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);

        const blit = (target: any) => {
            if (!target) { gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight); gl.bindFramebuffer(gl.FRAMEBUFFER, null); }
            else { gl.viewport(0, 0, target.width, target.height); gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo); }
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        let lastT = Date.now();
        const step = (dt: number) => {
            gl.disable(gl.BLEND);
            curlP.bind(gl); gl.uniform2f(curlP.uniforms.texelSize, 1 / simRes, 1 / simRes); gl.uniform1i(curlP.uniforms.uVelocity, vel.read.attach(0)); blit(curl);
            vortP.bind(gl); gl.uniform2f(vortP.uniforms.texelSize, 1 / simRes, 1 / simRes); gl.uniform1i(vortP.uniforms.uVelocity, vel.read.attach(0)); gl.uniform1i(vortP.uniforms.uCurl, curl.attach(1)); gl.uniform1f(vortP.uniforms.curl, CURL); gl.uniform1f(vortP.uniforms.dt, dt); blit(vel.write); vel.swap();
            divP.bind(gl); gl.uniform2f(divP.uniforms.texelSize, 1 / simRes, 1 / simRes); gl.uniform1i(divP.uniforms.uVelocity, vel.read.attach(0)); blit(div);
            clearP.bind(gl); gl.uniform1i(clearP.uniforms.uTexture, pres.read.attach(0)); gl.uniform1f(clearP.uniforms.value, PRESSURE); blit(pres.write); pres.swap();
            pressureP.bind(gl); gl.uniform2f(pressureP.uniforms.texelSize, 1 / simRes, 1 / simRes); gl.uniform1i(pressureP.uniforms.uDivergence, div.attach(0));
            for (let i = 0; i < pressureIterations; i++) { gl.uniform1i(pressureP.uniforms.uPressure, pres.read.attach(1)); blit(pres.write); pres.swap(); }
            gradP.bind(gl); gl.uniform2f(gradP.uniforms.texelSize, 1 / simRes, 1 / simRes); gl.uniform1i(gradP.uniforms.uPressure, pres.read.attach(0)); gl.uniform1i(gradP.uniforms.uVelocity, vel.read.attach(1)); blit(vel.write); vel.swap();
            const aV = setMaterialKeywords(advectM, []); aV.bind(gl); gl.uniform2f(aV.uniforms.texelSize, 1 / simRes, 1 / simRes); gl.uniform1i(aV.uniforms.uVelocity, vel.read.attach(0)); gl.uniform1i(aV.uniforms.uSource, vel.read.attach(0)); gl.uniform1f(aV.uniforms.dt, dt); gl.uniform1f(aV.uniforms.dissipation, VELOCITY_DISSIPATION); blit(vel.write); vel.swap();
            const aD = setMaterialKeywords(advectM, []); aD.bind(gl); gl.uniform2f(aD.uniforms.texelSize, 1 / simRes, 1 / simRes); gl.uniform1i(aD.uniforms.uVelocity, vel.read.attach(0)); gl.uniform1i(aD.uniforms.uSource, dye.read.attach(1)); gl.uniform1f(aD.uniforms.dissipation, DENSITY_DISSIPATION); blit(dye.write); dye.swap();
            pointers.forEach(p => { if (p.moved) { splatP.bind(gl); gl.uniform1i(splatP.uniforms.uTarget, vel.read.attach(0)); gl.uniform1f(splatP.uniforms.aspectRatio, canvas.width / canvas.height); gl.uniform2f(splatP.uniforms.point, p.texcoordX, p.texcoordY); gl.uniform3f(splatP.uniforms.color, p.deltaX, p.deltaY, 0); gl.uniform1f(splatP.uniforms.radius, SPLAT_RADIUS / 100); blit(vel.write); vel.swap(); gl.uniform1i(splatP.uniforms.uTarget, dye.read.attach(0)); gl.uniform3f(splatP.uniforms.color, p.color.r, p.color.g, p.color.b); blit(dye.write); dye.swap(); p.moved = false; } });
        };

        const render = () => { if (!canvas || !gl) return; gl.viewport(0, 0, canvas.width, canvas.height); if (TRANSPARENT) { gl.clearColor(0, 0, 0, 0); } else { gl.clearColor(BACK_COLOR.r / 255, BACK_COLOR.g / 255, BACK_COLOR.b / 255, 1); } gl.clear(gl.COLOR_BUFFER_BIT); const p = setMaterialKeywords(displayM, SHADING ? ["SHADING"] : []); p.bind(gl); gl.uniform2f(p.uniforms.texelSize, 1 / canvas.width, 1 / canvas.height); gl.uniform1i(p.uniforms.uTexture, dye.read.attach(0)); blit(null); };
        let requestFrameId: number;
        const update = () => { const dt = Math.min((Date.now() - lastT) / 1000, 0.016); lastT = Date.now(); if (!PAUSED) step(dt); render(); requestFrameId = requestAnimationFrame(update); };
        update();

        const handle = (e: any) => { if (!canvas) return; const r = canvas.getBoundingClientRect(), cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left, cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top; const p = pointers[0]; p.deltaX = (cx / canvas.width - p.texcoordX) * SPLAT_FORCE; p.deltaY = (1 - cy / canvas.height - p.texcoordY) * SPLAT_FORCE; p.texcoordX = cx / canvas.width; p.texcoordY = 1 - cy / canvas.height; p.moved = true; p.color = { r: Math.random() * 0.15, g: Math.random() * 0.15, b: Math.random() * 0.15 }; };
        window.addEventListener("mousemove", handle); window.addEventListener("touchstart", handle);
        const res = () => { if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; } }; window.addEventListener("resize", res); res();

        return () => { cancelAnimationFrame(requestFrameId); window.removeEventListener("mousemove", handle); window.removeEventListener("touchstart", handle); window.removeEventListener("resize", res); };
    }, [SIM_RES, DYE_RES, DENSITY_DISSIPATION, VELOCITY_DISSIPATION, PRESSURE, PRESSURE_ITERATIONS, CURL, SPLAT_RADIUS, SPLAT_FORCE, SHADING, PAUSED, BACK_COLOR, TRANSPARENT]);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[60]" style={{ mixBlendMode: 'screen', willChange: 'transform', transform: 'translateZ(0)' }} />;
};

export default SplashCursor;
