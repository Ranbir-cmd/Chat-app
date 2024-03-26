import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../store/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
	const [searchInput, setSearchInput] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations} = useGetConversations()


	const handleSubmit = (e) => {
		e.preventDefault();
		if(!searchInput) return;
		if (searchInput.length < 2){
			return toast.error("Search input must be at least 2 characters")
		}

		const conversation = conversations.find((convrsn) => convrsn.fullName.toLowerCase().includes(searchInput.toLowerCase()));
		if(conversation) {
			setSelectedConversation(conversation);
			setSearchInput("")
		} else {
			toast.error("No such user found")
		}
	};
	return (
		<form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full'
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;