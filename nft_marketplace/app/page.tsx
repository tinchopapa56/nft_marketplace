import HomeImg from "@/public/home.png"
import { Footer, Header } from "@/app/components";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const classes = {
    container: "text-white flex flex-col h-screen bg-gradient-to-r from-[#00cffd] to-[#b57edc]",
    hero: "flex items-center justify-between max-w-[1500px] mx-auto mb-[90px] w-full flex-grow px-[20px] gap-[20px]",
    textContainer: "flex-1 ",
    imgContainer: "flex-1 ",
    heading: "text-[60px] leading-[1.05] mb-[3.2rem]",
    description: "text-[24px] leading-[1.6] mb-16 mr-16",
    btns: "flex items-center gap-[32px] font-semibold",
    btn: "bg-white text-black text-[20px]  py-[16px] px-[32px] rounded-[9px] cursor-pointer transition-all duration-300 hover:bg-[#ddd]",
    buyBtn: "bg-[#e65c50] text-white transition-all duration-300 hover:bg-[#e65c80]",
  };

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.hero}>
        <div className={classes.textContainer}>
          <h1 className={classes.heading}>
            Where Art Meets Innovation, Step into NFTstore!
          </h1>
          <p className={classes.description}>
            Enter the nexus of creativity and innovation at NFTstore. Uncover a
            realm of digital marvels, and together, let s redefine the future of
            collectibles.
          </p>
          <div className={classes.btns}>
            <Link
              href="/marketplace"
              className={`${classes.btn} ${classes.buyBtn}`}
            >
              Buy Now!
            </Link>
            <Link href="/sellNFT" className={classes.btn}>
              List Now!
            </Link>
          </div>
        </div>
        <div className={classes.imgContainer}>
          <Image src={HomeImg} alt="NFTs" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
