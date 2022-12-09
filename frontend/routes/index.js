import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Market from "../pages/Market";
import MyNFT from "../pages/MyNFT";

export default function Router({isSignedIn, nftMarketplace, wallet}) {
    return (
        <Routes>
            <Route path="/" element={<Market isSignedIn={isSignedIn} nftMarketplace={nftMarketplace} wallet={wallet} />}/>
            <Route path="/myNFT" element={<MyNFT isSignedIn={isSignedIn} nftMarketplace={nftMarketplace} wallet={wallet} />}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>
    )
}