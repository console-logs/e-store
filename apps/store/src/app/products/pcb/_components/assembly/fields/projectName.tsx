"use client";
import ProjectNameTip from "@/app/products/pcb/_components/assembly/tips/projectNameTip";
import { selectProjectName, setProjectName } from "@/redux/reducers/pcbAssemblySlice";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useDispatch, useSelector } from "react-redux";

export default function ProjectName() {
	const dispatch = useDispatch();
	const projectName = useSelector(selectProjectName);

	return (
		<div>
			<Label>
				Project Name <ProjectNameTip />
			</Label>
			<Input
				placeholder="Enter your project name"
				type="text"
				name="projectName"
				autoComplete="off"
				className="w-full"
				required
				onChange={e => dispatch(setProjectName(e.target.value))}
				value={projectName}
			/>
		</div>
	);
}
