import Image from "next/image";
import Link from "next/link";

const MissionSection = () => {
  return (
    <section className="flex flex-col items-center justify-between container mt-10">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl font-bold">About - The Mission</h2>
        <p className="font-sm text-sm text-gray-600 max-w-2xl mx-auto text-center">
          Learn About The Aims of The Alumni Network
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="w-full md:w-1/2">
          <Image
            src="https://images.pexels.com/photos/7713172/pexels-photo-7713172.jpeg"
            alt="Graduate"
            width={800}
            height={600}
            className="rounded-lg shadow-lg object-cover w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2">
          <p className="mb-4">
            <strong className="text-gray-700">The UNZA Alumni System </strong>is
            more than a platform; it&apos;s a vibrant network designed to foster
            lasting relationships and meaningful engagement between the
            university and its graduates. This initiative aims to strengthen the
            UNZA community by celebrating achievements, enabling financial
            contributions, and providing invaluable mentorship. Here&apos;s a
            closer look at the mission driving this dynamic system.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-3">
            <li>
              <strong>
                Maintaining Meaningful Collaborations and Connections:
              </strong>{" "}
              At the heart of the UNZA Alumni System is the commitment to
              maintaining robust and meaningful connections beyond graduation.
              This platform ensures that alumni stay linked with their alma
              mater and with each other, fostering a network of support and
              collaboration.
            </li>
            <li>
              <strong>Enabling Financial Contributions:</strong> The UNZA Alumni
              System incorporates a transparent and accountable payment system,
              allowing alumni to contribute financially to various university
              initiatives.
            </li>
          </ul>
          <Link
            href="/about"
            className="text-green-700 font-semibold mt-4 inline-block hover:underline"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
