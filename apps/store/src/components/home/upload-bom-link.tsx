import { UPLOAD_BOM_PAGE } from "@/lib/routes";
import Link from "next/link";

export function UploadBomLink() {
	return (
		<div className="flex items-center justify-center">
			Too many parts?
			<Link
				href={UPLOAD_BOM_PAGE}
				className="ml-2 font-medium underline">
				Upload your BOM
			</Link>
		</div>
	);
}
