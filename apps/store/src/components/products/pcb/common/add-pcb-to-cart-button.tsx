import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";

export function AddPcbToCartBtn(props: { isLoading: boolean }) {
	const { isLoading } = props;
	return (
		<Button
			disabled={isLoading}
			className="w-full"
			type="submit">
			{isLoading ? (
				<Icons.spinner
					className="animate-spin text-center"
					aria-hidden="true"
				/>
			) : (
				"Add to Cart"
			)}
		</Button>
	);
}
