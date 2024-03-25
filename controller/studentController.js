const Company = require('../model/companySchema');
const Student = require('../model/studentSchema');

// render create student page
module.exports.createStudentPage = async function (req, res) {
	return res.render('add_student');
};

// create student
module.exports.createStudent = async function (req, res) {
	const { name, email, batch, college, placement, contactNumber, dsa, webd, react } = req.body;
	try {
		const student = await Student.findOne({ email });

		if (student) {
			console.log('Email already exists');
			return res.redirect('back');
		}

		const newStudent = await Student.create({
			name,
			email,
			college,
			batch,
			placement,
			contactNumber,
			dsa,
			webd,
			react,
		});
		await newStudent.save();

		return res.redirect('/');
	} catch (error) {
		console.log(`Error in creating student: ${error}`);
		return res.redirect('back');
	}
};

// edit student
module.exports.deleteStudent = async function (req, res) {
	const id = req.params.id; 


	try {

		const student = await Student.findById(id);

		if (student && student.interviews.length > 0) {
			for (const item of student.interviews) {
				const company = await Company.findOne({ name: item.company });
				if (company) {
					const studentIndex = company.students.findIndex(s => s.student.toString() === id);
					if (studentIndex !== -1) {
						company.students.splice(studentIndex, 1);
						await company.save();
					}
				}
			}
		}
		
		await Student.findByIdAndDelete(id);
		res.redirect('back');
	} catch (error) {
		console.log('Error in deleting student:', error);
		return res.redirect('back');
	}
};