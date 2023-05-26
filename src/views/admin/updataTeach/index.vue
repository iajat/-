<template>
  <div style=" position: absolute; left: 300px; top: 100px; padding-bottom: 200px;">
    <el-table :data="tableData" style="
                                              position: relative;
                                              top: 50%;
                                              left: 50%;
                                              transform: translate(-50%);
                                              width: 100 %;
                                            ">
      <el-table-column label="教师号" prop="teacherId" width="100px"> </el-table-column>
      <el-table-column label="姓名" prop="teacherName" width="100px"> </el-table-column>
      <el-table-column label="性别" prop="teacherSex" width="100px"> </el-table-column>
      <el-table-column label="学院" prop="deptName" width="200px"> </el-table-column>
      <el-table-column label="生日" prop="teacherBirthday" width="150px"> </el-table-column>
      <el-table-column label="课程" prop="courseName" width="150px"> </el-table-column>
      <el-table-column label="密码" prop="teacherPassword" width="150px"> </el-table-column>
      <el-table-column align="center" width="200px">
        <template slot="header" slot-scope="scope">
          <el-input @blur="blur" v-model="search" size="mini" placeholder="输入教师ID搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="详细信息" :visible.sync="dialogFormVisible" close="close">
      <el-form style="" :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.teacherName" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="teacherSex">
          <el-radio-group v-model="form.teacherSex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="课程" prop="major">
          <el-select v-model="form.courseId" placeholder="请选择活动区域">
            <el-option v-for="(i, index) in courseList" :label="i.courseName" :key="index"
              :value="i.courseId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="date1" label="出生日期">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker value-format="yyyy-MM-dd" v-model="form.teacherBirthday" type="date" placeholder="选择日期"
                style="width: 80%"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="登录密码" prop="teacherPassword">
          <el-input v-model="form.teacherPassword" style="width: 50%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination class="page" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page.pageNum" :page-sizes="[10, 20, 30]" :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
import rules from "@/util/rules";
export default {
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      courseList: [],
      search: '',
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: [],
      tableData: [
      ],
      rules: rules,
    };
  },
  components: {

  },
  mounted() {

    this.getAllTeach()
  },
  methods: {
    async blur() {
      let result = {code:400}
      try {
        result = await this.$API.getTeacherInfo(this.search)
        this.dialogFormVisible = true
      } catch (error) {
        console.log(error);
        this.$message.error('没有该老师信息')
      }

      if (result.code == 200) {
        let element = result.data
        this.form = {
          teacherBirthday: element.teacherBirthday,
          teacherId: element.teacherId,
          teacherName: element.teacherName,
          teacherSex: element.teacherSex,
          teacherPassword: element.teacherPassword,
          deptName: element.scDept.deptName,
          deptId: element.scDept.deptId - 0,
          courseName: element.scCourse.courseName,
          courseId: element.scCourse.courseId - 0,
        }
      }
    },
    //获取老师信息
    async getAllTeach() {
      this.tableData = []
      let result
      try {
        result = await this.$API.getAllTeach(this.page.pageNum, this.page.pageSize)
      } catch (error) {
        this.$message.error('获取信息失败 ')
      }
      if (result.code == 200) {
        let data = result.data
        let list = data.records
        let obj = {}
        this.page.pageNum = data.current;
        this.page.pageSize = data.size;
        this.page.total = data.total
        console.log(list);
        // 解析出老师的基本属性
        list.forEach(element => {
          obj = {
            teacherBirthday: element.teacherBirthday,
            teacherId: element.teacherId,
            teacherName: element.teacherName,
            teacherSex: element.teacherSex,
            teacherPassword: element.teacherPassword,
            deptName: element.scDept.deptName,
            deptId: element.scDept.deptId - 0,
            courseName: element.scCourse.courseName,
            courseId: element.scCourse.courseId - 0,   // id最好是数字，因为select里elementUi的底层对比的是数字，你拿字串符和数字去对比会匹配不上
          }
          this.tableData.push(obj)
          obj = {}
        });
      }
    },
    //编辑
    async handleEdit(index, row) {
      this.form = this.tableData.find((element) => {
        return row.teacherId == element.teacherId ? element : "";
      });
      try {
        var resolve = await this.$API.getNoTeaCou()
        this.dialogFormVisible = true;
      } catch (error) {
        this.$message.error('获取失败')
      }
      if (resolve.code == 200) {
        //获取到没有老师上课的课程列表
        this.courseList = resolve.data
        // 一个巨坑的点，因为列表中没有原来的课程，所有他会展示一个id号，把这个课程push到这个列表就能解决
        if (this.form.courseId != 0) {
          this.courseList.push(this.form)
        }

      }
    },
    async close() {
      let result = await this.$API.upTeacher(this.form)
      this.getAllTeach()
      this.dialogFormVisible = false;
    },
    async handleDelete(index, row) {
		let result =  await this.$API.delTeach(row.teacherId)
      if(result.code == 200){
		  this.getAllTeach();
		  this.$message.success('删除成功')
	  }
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getAllTeach();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val
      this.getAllTeach();

    }
  },
};
</script>

<style lang="less"></style>