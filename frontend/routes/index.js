import { Route, Routes } from "react-router";
import Jobs from "../pages/Jobs";
import MyNFT from "../pages/MyNFT";
import Staking from "../pages/Staking";
import Faucet from "../pages/Faucet";
import Voting from "../pages/Voting";
import JobsDetail from "../pages/JobsDetail";
import VotingDetail from "../pages/VotingDetail";

export default function Router({isSignedIn, contract_id, wallet}) {
    return (
        <Routes>
            <Route path="/" element={<Jobs isSignedIn={isSignedIn} contract_id={contract_id} wallet={wallet} />}/>
            <Route path="/myNFT" element={<MyNFT isSignedIn={isSignedIn} contract_id={contract_id} wallet={wallet} />}/>
            <Route path="/staking" element={<Staking isSignedIn={isSignedIn} contract_id={contract_id} wallet={wallet} />}/>
            <Route path="/faucet" element={<Faucet isSignedIn={isSignedIn} contract_id={contract_id} wallet={wallet} />}/>
            <Route path="/voting" element={<Voting isSignedIn={isSignedIn} contract_id={contract_id} wallet={wallet} />}/>
            <Route path="/jobs-detail" element={<JobsDetail isSignedIn={isSignedIn} contract_id={contract_id} wallet={wallet} />}/>
            <Route path="/voting-detail" element={<VotingDetail isSignedIn={isSignedIn} contract_id={contract_id} wallet={wallet} />}/>
        </Routes>
    )
}           