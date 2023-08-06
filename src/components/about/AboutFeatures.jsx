import React from 'react'

const AboutFeatures = () => {
  return (
    <div className="py-16 bg-white overflow-hidden m-2 shadow">
    <div className="container m-auto px-6 space-y-8 text-gray-500 md:px-12">
      <div>
        <span className="text-gray-700 text-lg font-semibold"></span>
        <h2 className="mt-4 text-2xl text-black text-center font-bold md:text-4xl">
          Main features
        </h2>
      </div>
      <div className="mt-16 grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
        <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
          <div className="relative p-8 space-y-8">
            <img
              src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/burger.png"
              className="w-10"
              width={512}
              height={512}
              alt="burger illustration"
            />
            <div className="space-y-2">
              <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                add ingredient
              </h5>
              <p className="text-sm text-gray-600">
                You can find different restaurants, whether near or far, to
                get the best and most delicious food
              </p>
            </div>
          </div>
        </div>
        <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
          <div className="relative p-8 space-y-8">
            <img
              src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/trowel.png"
              className="w-10"
              width={512}
              height={512}
              alt="burger illustration"
            />
            <div className="space-y-2">
              <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                Find recipes by ingredients
              </h5>
              <p className="text-sm text-gray-600">
                Ease of knowing the restaurants near you and the
                availability of available tables for reservation
              </p>
            </div>
          </div>
        </div>
        <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
          <div className="relative p-8 space-y-8">
            <img
              src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/package-delivery.png"
              className="w-10"
              width={512}
              height={512}
              alt="burger illustration"
            />
            <div className="space-y-2">
              <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                make recipe
              </h5>
              <p className="text-sm text-gray-600">
                Book a table at your favorite restaurant anytime you want
                via the Internet
              </p>
            </div>
          </div>
        </div>
        <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl lg:hidden xl:block">
          <div className="relative p-8 space-y-8 border-dashed rounded-lg transition duration-300 group-hover:bg-white group-hover:border ">
            <img
              src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/metal.png"
              className="w-10"
              width={512}
              height={512}
              alt="burger illustration"
            />
            <div className="space-y-2">
              <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                Ease of use of the website
              </h5>
              <p className="text-sm text-gray-600">
                Ease of use and suitability for user experience and
                simplicity of design
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AboutFeatures