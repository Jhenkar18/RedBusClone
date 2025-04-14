import React from "react";
import AppInstall from "../../assets/appInstallbg.svg"
import QRcode from "../../assets/qrCode.svg"
import PlayStore from "../../assets/playStore.svg"
import AppStore from "../../assets/appStore.svg"
import Tick from "../../assets/tick.svg"

const Enjoytheapp = () => {
    return (

        <div className="h-auto w-full ">
            <div className=" w-[1200px] h-[425px] m-auto bg-no-repeat bg-cover bg-center rounded-xl" style={{ backgroundImage: `url(${AppInstall})` }}>
                {/* <img src={AppInstall} alt="background image" /> */}

                <div >


                    <div>
                        <h1 className="font-bold text-white pt-8 pl-16 text-4xl">Enjoy The App</h1>
                    </div>

                    <div className="flex space-x-12 items-center mt-20 ml-12">
                        <div className=" flex flex-col h-[250px] w-[350px] bg-white space-y-8 items-center justify-center rounded-lg">
                            <div className="flex-col space-y-4">
                                <div className="flex space-x-4">
                                    <img src={Tick} alt="TIck image" />
                                    <h1 className="font-bold">Quick Access</h1>
                                </div>
                                <div className="flex space-x-4">
                                    <img src={Tick} alt="TIck image" />
                                    <h1 className="font-bold">Superior Live tracking</h1>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div>
                                    <h3 className="font-bold">4.5*</h3>
                                    <h3>50M+ Downloads</h3>
                                    <h3 className="font-semibold">Play Store</h3>
                                </div>
                                <span className=" border-2 border-gray-400 h-20"></span>
                                <div>
                                    <h3 className="font-bold">4.6*</h3>
                                    <h3>50M+ Downloads</h3>
                                    <h3 className="font-semibold">App Store</h3>
                                </div>
                            </div>
                        </div>


                        <div className="flex-col space-y-2">
                            <div>
                                <h2 className="font-bold text-white">Scan To</h2>
                                <h2 className="font-bold text-white">Download</h2>
                            </div>
                            <div>
                                <img src={QRcode} />
                            </div>
                        </div>

                        <div className="flex-col space-y-2">
                            <div>
                                <h2 className="font-bold text-white">Download</h2>
                                <h2 className="font-bold text-white">the APP On</h2>
                            </div>
                            <div>
                                <img src={PlayStore} />
                            </div>
                            <div>
                                <img src={AppStore} />
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>

    )
}

export default Enjoytheapp;