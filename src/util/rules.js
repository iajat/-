
export default
    {
        name: [
            { required: true, message: "请输入名称", trigger: "blur" },
            { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        major: [{ required: true, message: "请选择专业", trigger: "blur" }],
        male: [{ required: true, message: "请选择性别", trigger: "change" }],
        date1: [
            {
                type: "date",
                required: true,
                message: "请选择日期",
                trigger: "change",
            },
        ],
        password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 1, max: 12, message: "长度在 1 到 12 个字符", trigger: "blur" },
        ],
        courseName: [
            { required: true, message: "请输入课程", trigger: "blur" }
        ],
        courseCredit: [
            { required: true, message: "请给定课程学分", trigger: "blur" },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        courseNum: [
            { required: true, message: "选定课程最大人数", trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        courseClass:[
            { required: true, message: "请给定课教室", trigger: "blur" },
        ],
        studentName: [
            { required: true, message: "请输入名称", trigger: "blur" },
            { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        majorId: [{ required: true, message: "请选择专业", trigger: "blur" }],
        studentSex: [{ required: true, message: "请选择性别", trigger: "change" }],
        studentBirthday: [
            {
                type: "date",
                required: true,
                message: "请选择日期",
                trigger: "change",
            },
        ],
        studentPassword: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 1, max: 12, message: "长度在 1 到 12 个字符", trigger: "blur" },
        ],
        teacherSex: [
            { required: true, message: "请选择性别", trigger: "change" }
        ],

        teacherName: [{ required: true, message: "请输入名称", trigger: "blur" },
        { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },],
        deptId: [{ required: true, message: "请选择院系", trigger: "blur" }],
        teacherBirthday: [{
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
        },],

    }