const FormInput = ({ label, type, id, user, setUser }) => {
	return (
		<>
			<label htmlFor={id}>
				{label} <span className="required-field">*</span>
			</label>
			<input
				id={id}
				type={type}
				value={user[id]}
				onChange={(e) => setUser({ ...user, [id]: e.target.value })}
			></input>
		</>
	);
};

export default FormInput;
