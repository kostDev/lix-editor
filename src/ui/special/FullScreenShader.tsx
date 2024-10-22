import { useRef, useEffect } from 'react';
// @ts-ignore
import * as THREE from 'three';

// Створюємо компонент для шейдера на весь екран
const FullScreenShader = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Налаштування сцени, камери та рендера
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Створюємо геометрію на весь екран
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Створюємо матеріал із шейдером
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_time: { value: 0.0 },
      },
      fragmentShader: `
        precision mediump float;

        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec4 u_mouse;
        
        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution;
          vec2 mouse = u_mouse.xy / u_resolution;
          // Темний сірий фон
          vec3 backgroundColor = vec3(0.5, 0.1, 0.5); 
      
          // Додавання скан-ліній
          float scanline = sin(st.y * 2400.0 * 0.02) * 0.001; 
      
          // Створення неонового кольору з меншою інтенсивністю
          vec3 neonColor = vec3(0.4, 0.3, 1.0) * 0.015; // Менш насичений неоновий блакитний колір
      
          // Додавання вигину екрану
          vec2 uv = st * 22.0 - 11.0;
          uv.x *= mouse.y * 0.25 + 0.1 * sin(uv.y * 3.14159);
          uv.y *=  mouse.x *1.0 + 1.0 + 0.1 * cos(uv.x * 3.14159);
      
          // Анімація кольору на основі часу та координат
          neonColor.r += 0.2 * sin(u_time + uv.x * 15.0);
          neonColor.g += 0.1 * sin(u_time + uv.y * 5.0);
          neonColor.b += 0.2 * cos(u_time + uv.x * 15.0);
      
          // Плавне змішування неонового кольору з темним фоном
          vec3 finalColor = mix(backgroundColor, neonColor, 1.4); // Зменшена насиченість через плавне змішування
          finalColor -= scanline;
      
          gl_FragColor = vec4(finalColor, 0.8); // Зменшена прозорість ефекту
        }
      `,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const animate = () => {
      material.uniforms.u_time.value += 0.01; // Анімація часу
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Видаляємо шейдер при розмонтуванні компонента
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.75,
        zIndex: 0
      }}
    />
  );
};

export default FullScreenShader;
