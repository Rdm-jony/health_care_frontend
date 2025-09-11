import aboutImg from "@/assets/images/about_image.png"

const About = () => {
    return (
        <section>
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2  items-center gap-8">
                    <div className="max-w-lg">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Us</h2>
                        <p className="mt-4 text-gray-600 text-justify text-sm">Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.

                            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
                        <p className="font-bold my-5">Our Vision</p>

                        <p className="text-gray-600 text-justify text-sm">Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
                        <div className="mt-8">
                            <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">Learn more about us
                                <span className="ml-2">&#8594;</span></a>
                        </div>
                    </div>
                    <div className="mt-12 md:mt-0">
                        <img src={aboutImg} alt="About Us Image" className="object-cover rounded-lg shadow-md" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;