import Header from "./components/Header";
// import Wrapper from "./components/Wrapper";
import Nav from "./components/Nav";
// import NFTArt from "./components/NFTArt";
// import NFTMusic from "./components/NFTMusic";
// import Concert from "./components/Concert";
// import Shop from "./components/Shop";
// import Metaverse from "./components/Metaverse";
// import About from "./components/About";
import Footer from "./components/Footer";
import { Init } from "./utils";
import { useSharedContractData } from "./store/ContractData";
import { useEffect } from "react";
import { GetWhitelisted } from "./services/api.service";
import Mint from "./components/Mint";
// import ContractInfo from "./components/ContractInfo";
import { Toaster } from "react-hot-toast";
// import concert from "./video/concert.mp4";
import backdrop from "./img/concert_blue_snapshot.jpg";

function App() {
  const { setContractData, setWhitelisted } = useSharedContractData();

  useEffect(() => {
    // const InitWeb3 = async () => {
    //   setContractData(await GetContractData());
    // };
    Init();
    // InitWeb3();
    GetWhitelisted().then((x) => {
      setWhitelisted(x);
    });
  }, [setContractData, setWhitelisted]);

  return (
    <div className="h-[22rem]">
      {/* <video
					className='z-[-1] top-0 right-0 w-screen h-screen fixed object-cover opacity-60'
					autoPlay
					loop
					muted
				>
					<source src={concert} type='video/mp4' />
				</video> */}
				<img className='z-[-1] w-screen h-screen fixed object-cover opacity-60' src={backdrop} alt='CryptoCrewz' />
      <Toaster
        toastOptions={{
          className: "toast",
        }}
      />
      
      <Nav />
      <Header className="w-full"></Header>
      <div id="home" className="container px-5 mx-auto w-full flex items-center justify-center h-full" >
        <Mint></Mint >   
        {/* <Wrapper>
					<NFTArt />
				</Wrapper>

				<Wrapper>
					<NFTMusic />
				</Wrapper>

				<Wrapper>
					<h1 className='text-center'>
						Recordifly Music Platform
						<br />
						Coming Soon
					</h1>
					<p className='mt-4 text-center'>
						Buy, sell, and auction your limited edition NFT music content. Spend
						your loyalty points on cool gear, new music, and merchandise.
					</p>
				</Wrapper>

				<Wrapper>
					<Concert />
				</Wrapper>

				<Wrapper>
					<Shop />
				</Wrapper>

				<Wrapper>
					<Metaverse />
				</Wrapper>

				<Wrapper>
					<About />
				</Wrapper> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
