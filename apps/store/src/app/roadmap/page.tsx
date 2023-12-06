import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap",
};

export default function Roadmap() {
  return (
    <div className="px-4 sm:px-32 mb-10">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Roadmap</h1>
      <div className="space-y-10 mt-10">
        Our teams are working on new features to make Circuit Parts even better.
        Our roadmap typically looks out for 12-24 months and we establish
        features we want to work on. We don&apos;t start our roadmap on a blank
        sheet. We develop it based on our last roadmap, the findings we made
        over the course of the last one year. When we execute on our roadmap, we
        keep learning and our assessment of some of the features we listed
        change. As a result, we may add or drop features as we go. After around
        12 months we come together to develop the next roadmap.
      </div>
      <h2 className="space-y-10 mt-5 text-lg font-bold">Engineering</h2>
      <ul className="list-disc ml-6 space-y-1 mt-2">
        <li>
          Project management tool that to save multiple projects or part lists
          and then order them at their convenience with just couple of clicks.
        </li>
        <li>
          Devlop an inventory management tool that seamlessly integrates with
          our ordering platform.
        </li>
        <li>
          Introduce feature to download symbols, footprints, & 3D models for
          millions of electronic components
        </li>
        <li>
          Develop extensions for design tools that seamlessly lets our users to
          order components and PCBs from within their CAD tools.
        </li>
        <li>
          Introduce electronic design calculators based on the current IPC
          standards.
        </li>
      </ul>
      <h2 className="space-y-10 mt-5 text-lg font-bold">
        Business Development
      </h2>
      <ul className="list-disc ml-6 space-y-1 mt-2">
        <li>Achieve same day shipping.</li>
        <li>
          Establish In-house PCB manufacturing and assembly services and reduce
          manufacturing costs.
        </li>
        <li>
          Educational resources for hands-on hardware design and development
          with DIY kits.
        </li>
      </ul>
    </div>
  );
}
