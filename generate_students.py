import json
from datetime import date

# 1. Base name list (120 names, already alphabetical-safe)
first_names = [
    "Aarav","Aarohi","Aditi","Advik","Akash","Ananya","Arjun","Arya","Avinash","Bhavya",
    "Charan","Deepak","Devika","Dhruv","Divya","Eesha","Farhan","Gauri","Harsha","Ishaan",
    "Ishita","Jatin","Karthik","Kavya","Krishna","Lakshmi","Manoj","Meera","Naveen","Neha",
    "Nikhil","Pooja","Pranav","Rahul","Riya","Rohit","Saanvi","Saketh","Sameer","Sanjana",
    "Shreya","Siddharth","Sneha","Soham","Sravya","Tanmay","Trisha","Uday","Varun","Vidya",
    "Vikram","Yash","Zoya",

    # Section B continues
    "Aadhya","Abhinav","Adarsh","Ajay","Akhila","Amit","Anil","Ankita","Anusha","Arvind",
    "Chaitanya","Darshan","Dinesh","Eshwar","Ganesh","Geetha","Gopal","Hemanth","Indira","Jayant",
    "Keerthi","Lokesh","Madhavi","Mahesh","Nandini","Pallavi","Rakesh","Ramya","Sandeep","Satya",
    "Suman","Tejas","Vamsi","Vasudha","Venkat","Vinay","Yamini","Yogesh","Yuvraj","Zain"
]

last_names = [
    "Reddy","Sharma","Verma","Patel","Iyer","Mehta","Gupta","Khan","Das","Rao"
]

students = []

# 2. Sort names alphabetically by firstName
first_names = sorted(first_names)

# 3. Generate students
for i, first_name in enumerate(first_names):
    reg_no = f"AI2025-{str(i+1).zfill(3)}"
    section = "ai-1a" if i < 60 else "ai-1b"

    student = {
        "regNo": reg_no,
        "firstName": first_name,
        "lastName": last_names[i % len(last_names)],
        "email": f"{first_name.lower()}.{reg_no.lower()}@example.in",
        "phone": f"+91 90000{str(10000 + i)}",
        "dob": "2006-06-15",
        "gender": "Female" if i % 2 == 0 else "Male",
        "address": "India",
        "department": "Artificial Intelligence",
        "semester": "1-1",
        "sectionId": section
    }

    students.append(student)

# 4. Write to students.json
with open("students.json", "w", encoding="utf-8") as f:
    json.dump(students, f, indent=2)


