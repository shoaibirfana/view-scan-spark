import { useRef, useMemo, useCallback, createElement } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Float, Text, RoundedBox, Line } from "@react-three/drei";
import * as THREE from "three";

/* ─── Floating e-commerce icon cards ─── */
const IconCard = ({
  position,
  label,
  delay,
  color,
}: {
  position: [number, number, number];
  label: string;
  delay: number;
  color: string;
}) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime + delay;
    group.current.position.y = position[1] + Math.sin(t * 0.6) * 0.3;
    group.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    group.current.rotation.x = Math.cos(t * 0.4) * 0.08;
  });

  return (
    <group ref={group} position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Card background */}
        <RoundedBox args={[1.6, 0.7, 0.08]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={0.12}
            roughness={0.1}
            transmission={0.3}
            thickness={0.5}
          />
        </RoundedBox>
        {/* Label */}
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.18}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4C_k3HqUtEw.woff"
          maxWidth={1.4}
        >
          {label}
        </Text>
      </Float>
    </group>
  );
};

/* ─── Animated connection lines between nodes ─── */
const ConnectionLine = ({
  start,
  end,
  color,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}) => {
  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2 + 0.8,
        (start[2] + end[2]) / 2
      ),
      new THREE.Vector3(...end)
    );
    return curve.getPoints(30);
  }, [start, end]);

  return (
    <Line
      points={points}
      color={color}
      transparent
      opacity={0.2}
      lineWidth={1}
    />
  );
};

/* ─── Orbiting data dots ─── */
const DataParticles = () => {
  const count = 60;
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color("#0d9488");
    const c2 = new THREE.Color("#10b981");
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.5 + Math.random() * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = Math.sin(angle) * radius * 0.5 - 2;
      const c = Math.random() > 0.5 ? c1 : c2;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
};

/* ─── Rising growth bar chart ─── */
const GrowthChart = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  const bars = [0.4, 0.6, 0.5, 0.8, 0.7, 1.0];

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    <group ref={groupRef} position={position}>
      {bars.map((h, i) => (
        <mesh key={i} position={[i * 0.22 - 0.55, h * 0.5 - 0.3, 0]}>
          <boxGeometry args={[0.14, h, 0.14]} />
          <meshPhysicalMaterial
            color={i === bars.length - 1 ? "#10b981" : "#0d9488"}
            transparent
            opacity={0.25 + i * 0.05}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

/* ─── Main Scene ─── */
const Scene3D = () => {
  const serviceLabels = useMemo(
    () => [
      { pos: [-3.5, 2.2, -1] as [number, number, number], label: "Amazon FBA", delay: 0, color: "#0d9488" },
      { pos: [3.8, 1.8, -2] as [number, number, number], label: "Shopify", delay: 1.2, color: "#10b981" },
      { pos: [-4, -1.5, -1.5] as [number, number, number], label: "TikTok Shop", delay: 2.4, color: "#14b8a6" },
      { pos: [4.2, -1, -1] as [number, number, number], label: "Brand Registry", delay: 3.6, color: "#059669" },
      { pos: [-2.5, 0.3, -2.5] as [number, number, number], label: "LLC Formation", delay: 0.8, color: "#0d9488" },
      { pos: [2.8, 0.2, -2] as [number, number, number], label: "Product Sourcing", delay: 2, color: "#10b981" },
    ],
    []
  );

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        <pointLight position={[-3, 3, 2]} intensity={0.3} color="#0d9488" />

        {/* Service label cards */}
        {serviceLabels.map((s) => (
          <IconCard key={s.label} position={s.pos} label={s.label} delay={s.delay} color={s.color} />
        ))}

        {/* Connection lines between services */}
        <ConnectionLine start={[-3.5, 2.2, -1]} end={[3.8, 1.8, -2]} color="#0d9488" />
        <ConnectionLine start={[-4, -1.5, -1.5]} end={[4.2, -1, -1]} color="#10b981" />
        <ConnectionLine start={[-2.5, 0.3, -2.5]} end={[2.8, 0.2, -2]} color="#14b8a6" />
        <ConnectionLine start={[-3.5, 2.2, -1]} end={[-2.5, 0.3, -2.5]} color="#059669" />
        <ConnectionLine start={[3.8, 1.8, -2]} end={[2.8, 0.2, -2]} color="#0d9488" />

        {/* Growth chart */}
        <GrowthChart position={[0, -2.5, -1]} />

        {/* Orbiting particles */}
        <DataParticles />
      </Canvas>
    </div>
  );
};

export default Scene3D;
