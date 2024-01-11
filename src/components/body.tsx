import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsVisible } from '../utils/useIsVisible';
import energy1 from "../images/energy1.jpg"
import energy5 from "../images/energy5.jpg"
import benefits from "../images/benefit2.jpg"

const Body = () => {
    const ref1 = useRef<HTMLParagraphElement | null>(null);
    const isVisible1 = useIsVisible(ref1);

    const ref2 = useRef<HTMLHeadingElement | null>(null);
    const isVisible2 = useIsVisible(ref2);

    const ref3 = useRef<HTMLDivElement | null>(null);
    const isVisible3 = useIsVisible(ref3);

    const [timer, setTimer] = useState<number>(3600)
    const [imagCarousel, setImageCarousel] = useState(0)

    const imageGallery = [<div className='relative w-full flex flex-col justify-center items-center mx-auto'>
        <img src={energy1} className='w-full h-[550px] object-fill'></img>
        <div className="absolute right-0 top-0 py-20 px-6 bg-yellow-800 bg-opacity-65 border-l-4 border-yellow-200 rounded-sm text-white">
            <h1 className="text-2xl font-bold">Welcome to Electricity Marketplace</h1>
            <p className="text-md">Empowering Energy Trading for a Sustainable Future</p>
        </div>
    </div>,
    <div className='relative w-full flex flex-col justify-center items-center mx-auto'>
        <img src={energy5} className='w-full h-[550px] object-fill'></img>
        <div className="absolute right-0 bottom-0 bg-gray-500 py-20 px-6 bg-opacity-80 border-l-4 border-teal-200 rounded-sm text-white">
            <h1 className="text-2xl font-bold">ElectricBids to extend its platform in France</h1>
            <p className="text-md after:border-b-4 after:border-teal-200">Empowering Energy Trading for a Sustainable Future</p>
        </div>
    </div>]

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (imagCarousel === 1) {
                setImageCarousel(0)
            } else {
                setImageCarousel(prev => prev + 1)
            }
        }, 4000)

        return () => clearInterval(intervalId)
    }, [imagCarousel])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const formatTime = (timeInSeconds: number) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        return formattedTime;
    }

    return (
        <div className="w-full flex flex-col items-center">

            {imageGallery.map((image, i) =>
                <div key={i} className={` ${imagCarousel === i ? 'block' : 'hidden'} w-full`}>
                    {image}
                </div>)}
            {/* ABout us*/}
            <section className={`py-24 flex px-32 justify-center items-center bg-teal-50 `}>
                <p ref={ref1} className={`text-gray-600 text-[22px] indent-6 font-semibold text-center transition-opacity delay-100 ease-in duration-800 ${isVisible1 ? "opacity-100" : "opacity-0"}`}>
                    Discover the power of our electricity bidding marketplace for sellers.
                    We provide a seamless business energy comparison service, ensuring the best prices for both business gas and electricity.
                    Partnering with leading utility suppliers, we deliver real-time quotes,
                    empowering sellers to make informed and cost-effective decisions for their energy needs.
                </p>
            </section >

            {/* Benefits Section */}
            < section className="py-24 w-10/12" >
                <div className="flex space-x-24 items-center">
                    <div className="">
                        <img src={benefits} className='rounded-lg h-[300px]'></img>
                    </div>
                    <div className="">
                        <h2 className="text-3xl font-semibold mb-8">Benefits of Joining</h2>
                        <div className="flex flex-col space-y-4 text-gray-600 font-semibold text-lg">
                            <div>Efficient and Transparent Energy Trading</div>
                            <div>Connect with Reputable Electricity Providers</div>
                            <div>Maximize Your Revenue Potential</div>
                            <div>Track and Analyze Your Bids</div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Featured Bids Section */}
            <section className="py-24 px-32 w-full bg-teal-50">
                <h2 ref={ref2} className={`transition-opacity ease-in delay-100 duration-700 ${isVisible2 ? "opacity-100" : "opacity-0"} text-3xl font-semibold mb-8`}>Featured Bids</h2>
                {/* Featured bid cards go here */}
                <div ref={ref3} className={`transition-opacity ease-in delay-100 duration-700 ${isVisible3 ? "opacity-100" : "opacity-0"} flex flex-col rounded`}>
                    <Link to='/placeBid' className="text-xl font-semibold mb-2 cursor-pointe text-red-600 hover:text-slate-500">Energy exhange 2.0 - 11/01/2024 12 PM GMT <span className=' text-red-500'> Closes in {formatTime(timer)}</span></Link>
                    <a className="text-xl font-semibold mb-2 cursor-pointer hover:text-orange-600">Energy exhange 2.1 - 26/01/2024 06 AM GMT</a>
                    <a className="text-xl font-semibold mb-2 cursor-pointer hover:text-orange-600">Energy exhange 2.2 - 06/02/2024 04 PM GMT</a>
                    {/* Repeat for other featured bids */}
                </div>
            </section >


            {/* Contact Section */}
            < section className="py-24 w-10/12" >
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-800">Have questions or need assistance? Reach out to our support team at <span className="text-blue-500">support@electricbids.com</span>.</p>
            </section >

        </div >
    );
};

export default Body;
