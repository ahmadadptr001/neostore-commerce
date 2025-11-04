import PhoneModel from '../UI/Models/PhoneModel';
import BoxModel from '../UI/Models/BoxModel';
import BagModel from '../UI/Models/BagModel';

export default function AboutUs() {
  return (
    <section className="container mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">About Us</h2>
        <p className="text-gray-500 mt-2">
          Order now and explore our best collections.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Item 1 */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-32 flex items-center justify-center">
            <BagModel />
          </div>
          <h3 className="font-semibold text-lg">Large Assortment</h3>
          <p className="text-gray-500 text-sm max-w-xs">
            We offer a wide range of products, each carefully selected for quality.
          </p>
        </div>

        {/* Item 2 */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-32 flex items-center justify-center">
            <BoxModel />
          </div>
          <h3 className="font-semibold text-lg">Fast & Free Shipping</h3>
          <p className="text-gray-500 text-sm max-w-xs">
            Fast delivery in 4 days or less, free shipping, and optional expedited service.
          </p>
        </div>

        {/* Item 3 */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-32 flex items-center justify-center">
            <PhoneModel />
          </div>
          <h3 className="font-semibold text-lg">24/7 Support</h3>
          <p className="text-gray-500 text-sm max-w-xs">
            Answers to any business related inquiry 24/7 and in real-time.
          </p>
        </div>
      </div>
    </section>
  );
}
