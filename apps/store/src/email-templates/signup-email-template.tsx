export function SignupEmailTemplate({ firstName }: { firstName: string }) {
	return (
		<div className="space-y-2">
			<h1 className="font-bold text-lg">Thanks for signing up!</h1>
			<p>Hi {firstName},</p>
			<p>Thanks for signing up for our app!</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae ducimus laboriosam tenetur est
				dolores itaque. Itaque numquam qui cupiditate ipsam debitis? Reiciendis quam accusantium ad molestias
				quaerat, dolor nemo dolore?
			</p>
			<p>Best,</p>
			<p>E-Store Team</p>
		</div>
	);
}
