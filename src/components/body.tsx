import { Link } from 'react-router-dom';

const Body = () => {


    return (
        <div className="w-full flex flex-col items-center">
            <div className='relative w-full flex flex-col justify-center items-center mx-auto '>
                <img src='/images/energy1.jpg' className='w-full h-[500px] object-fill'></img>
                <div className="absolute right-4 top-10 text-white">
                    <h1 className="text-2xl font-bold">Welcome to Electricity Marketplace</h1>
                    <p className="text-md">Empowering Energy Trading for a Sustainable Future</p>
                </div>
            </div>

            {/* Featured Bids Section */}
            <section className="my-8 w-10/12">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Bids</h2>
                {/* Featured bid cards go here */}
                <div className="flex flex-col bg-white p-4 rounded shadow-md">
                    <a className="text-xl font-semibold mb-2 cursor-pointer hover:text-orange-600">Energy exhange 2.0 - 16/01/2024 12 PM GMT</a>
                    <a className="text-xl font-semibold mb-2 cursor-pointer hover:text-orange-600">Energy exhange 2.1 - 26/01/2024 06 AM GMT</a>
                    <a className="text-xl font-semibold mb-2 cursor-pointer hover:text-orange-600">Energy exhange 2.2 - 06/02/2024 04 PM GMT</a>
                    {/* Repeat for other featured bids */}
                </div>
            </section >

            {/* How It Works Section */}
            < section className="my-8 w-10/12" >
                <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                <p className="text-gray-800">
                    Discover and place bids to sell electricity on our marketplace. Connect with electricity providers and make your energy trading experience seamless.
                </p>
            </section >

            {/* Benefits Section */}
            < section className="my-8 w-10/12" >
                <h2 className="text-2xl font-semibold mb-4">Benefits of Joining</h2>
                <ul className="list-disc list-inside text-gray-800">
                    <li>Efficient and Transparent Energy Trading</li>
                    <li>Connect with Reputable Electricity Providers</li>
                    <li>Maximize Your Revenue Potential</li>
                    <li>Track and Analyze Your Bids</li>
                </ul>
            </section >

            {/* Get Started Section */}
            < section className="my-8 w-10/12" >
                <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
                <p className="text-gray-800">
                    Ready to get started? <Link to="/bid-placement" className="text-blue-500">Place a Bid</Link> now!
                </p>
            </section >

            {/* Contact Section */}
            < section className="my-8 w-10/12" >
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-800">Have questions or need assistance? Reach out to our support team at <span className="text-blue-500">support@electricmarket.com</span>.</p>
            </section >

        </div >
    );
};

export default Body;
