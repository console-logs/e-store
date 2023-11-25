import Feature from "@/app/_components/home/feature";
import SearchComponentInput from "@/app/_components/home/search";
import SubTitle from "@/app/_components/home/subtitle";
import Title from "@/app/_components/home/title";
import UploadBom from "@/app/_components/home/upload";

export default async function Home() {
  return (
    <>
      <Title />
      <SubTitle />
      <SearchComponentInput />
      <UploadBom />
      <Feature />
    </>
  );
}
