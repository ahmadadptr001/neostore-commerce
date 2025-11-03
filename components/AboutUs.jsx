import { Flower, Flower2, Package, PhoneOutgoing } from 'lucide-react';

export default function AboutUs() {
  return (
    <section className="container mt-10 mx-auto p-4">
      <div className="text-center">
        <h2 className="font-bold text-3xl">About Us</h2>
        <p className="text-gray-500 mt-2">
          Order now and explore our best collections.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-12 mt-15 gap-12 sm:gap-18">
        <div className="text-center">
          <span className="rounded-full bg-primary-new text-white p-6 block w-fit mx-auto">
            <Flower2 size={40} />
          </span>
          <h3 className="mt-4 font-semibold">Large Assortmen</h3>
          <p className="text-sm text-gray-500 mt-2">
            We offer a wide range of products, each carefully selected for
            quality
          </p>
        </div>

        <div className="text-center">
          <span className="rounded-full bg-primary-new text-white p-6 block w-fit mx-auto">
            <Package size={40} />
          </span>
          <h3 className="mt-4 font-semibold">Fast & Free Shipping</h3>
          <p className="text-sm text-gray-500 mt-2">
            Fast delivery in 4 days or less, free shipping, and optional
            expedited service
          </p>
        </div>

        <div className="text-center">
          <span className="rounded-full bg-primary-new text-white p-6 block w-fit mx-auto">
            <PhoneOutgoing size={40} />
          </span>
          <h3 className="mt-4 font-semibold">24/7 Support</h3>
          <p className="text-sm text-gray-500 mt-2">
            answers to any business related inquiry 24/7 and in real-time.
          </p>
        </div>
      </div>
    </section>
  );
}
