'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

function FloatingShape({ position, color, speed, factor }) {
  return (
    <Float
      speed={speed} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[0.1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <mesh position={position}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={speed * 2}
          distort={0.4}
          radius={1}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 500;
  const mesh = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        const t = Math.random() * 100;
        const factor = 20 + Math.random() * 100;
        const speed = 0.01 + Math.random() / 200;
        const xFactor = -50 + Math.random() * 100;
        const yFactor = -50 + Math.random() * 100;
        const zFactor = -50 + Math.random() * 100;
        temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      // Lerp mouse influence
      particle.mx += (mouse.current.x * 50 - particle.mx) * 0.02;
      particle.my += (mouse.current.y * 50 - particle.my) * 0.02;

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshPhongMaterial color="#16f2b3" />
    </instancedMesh>
  );
}

export default function Background3D() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[50, 50, 50]} angle={0.25} penumbra={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#16f2b3" />
        
        {/* Stars in background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Floating Clouds/Nebula feel */}
        <Cloud opacity={0.5} speed={0.4} width={10} depth={1.5} segments={20} position={[0, -5, -10]} color="#a020f0" />
        <Cloud opacity={0.5} speed={0.4} width={10} depth={1.5} segments={20} position={[0, 10, -15]} color="#16f2b3" />

        {/* Floating Distorted Spheres for extra tech feel */}
        <FloatingShape position={[-10, -5, -5]} color="#7c3aed" speed={1.5} />
        <FloatingShape position={[10, 5, -10]} color="#16f2b3" speed={1.5} />
        
        {/* Moving Particles */}
        <ParticleField />
      </Canvas>
    </div>
  );
}
