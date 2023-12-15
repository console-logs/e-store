import loadingHourGlass from "public/images/loadingHourglass.gif";
import Image from "next/image";
export default function Loading() {
	return (
		<div className="flex justify-center items-center max-h-screen">
			<Image
				className="w-auto mt-48"
				src={loadingHourGlass}
				priority={false}
				alt="Loading"
			/>
		</div>
	);
}
