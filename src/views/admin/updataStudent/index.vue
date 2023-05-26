<template>
  <div style=" position: absolute; left: 300px; top: 100px; padding-bottom: 200px;">
    <el-table :data="tableData" class="container" style="
                                    position: relative;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%);
                                    width: 100 %;
                                  ">


      <el-table-column label="学号" prop="studentId" width="150px"> </el-table-column>
      <el-table-column label="姓名" prop="studentName" width="150px"> </el-table-column>
      <el-table-column label="性别" prop="studentSex" width="100px"> </el-table-column>
      <el-table-column label="专业" prop="majorName" width="200px"> </el-table-column>
      <el-table-column label="生日" prop="studentBirthday" width="150px"> </el-table-column>
      <el-table-column label="密码" prop="studentPassword" width="200px"> </el-table-column>
      <el-table-column align="center" width="200px">
        <template slot="header" slot-scope="scope">
          <el-input @blur="bulr" v-model="search" size="mini" placeholder="输入学生学号搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="学生信息" :visible.sync="dialogFormVisible">
      <el-form style="" :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="form.studentName" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="studentSex">
          <el-radio-group v-model="form.studentSex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="专业" prop="majorId">
          <el-select v-model="form.majorId" placeholder="请选择">
            <el-option v-for="item in majorAll" :key="item.majorId" :label="item.majorName" :value="item.majorId">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item prop="date1" label="出生日期">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker value-format="yyyy-MM-dd" v-model="form.studentBirthday" type="date" placeholder="选择日期"
                style="width: 80%"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="登录密码" prop="studentPassword">
          <el-input v-model="form.studentPassword" style="width: 50%"></el-input>
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
        total: 0,

      },
      search: '',
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        studentId: '',
        studentName: '',
        studentSex: '',
        majorId: '',
        studentBirthday: '',
        studentPassword: ''
      },
      tableData: [
      ],
      majorAll: [],
      rules: rules,
    };
  },

  watch: {

  },
  mounted() {
    this.getAllStduent();
  },
  methods: {
    async bulr() {
      let result
      try {
        result = await this.$API.getStudentInfo(this.search)
      } catch (error) {
        this.$message.error('没有此学号的学生')
      }
      let element = result.data
      this.form = {
        studentId: element.studentId,
        studentName: element.studentName,
        studentSex: element.studentSex,
        majorName: element.scMajor.majorName,
        majorId: element.majorId - 0,  // id最好是数字，因为select里elementUi的底层对比的是数字，你拿字串符和数字去对比会匹配不上
        studentBirthday: element.studentBirthday,
        studentPassword: element.studentPassword,
      }
      this.dialogFormVisible = true
      console.log(result);
    },

    async getAllStduent() {
      this.tableData = []
      let result = await this.$API.getAllStduent(this.page.pageNum, this.page.pageSize);
      let obj = {}
      if (result.code == 200) {
        //页面参数
        let  data  = result.data
        this.page.pageSize = data.current
        this.page.pageSize = data.size
        this.page.total = data.total

        //获取学生列表
        data.records.forEach(element => {
          obj = {
            studentId: element.studentId,
            studentName: element.studentName,
            studentSex: element.studentSex,
            majorName: element.scMajor.majorName,
            majorId: element.majorId - 0,  // id最好是数字，因为select里elementUi的底层对比的是数字，你拿字串符和数字去对比会匹配不上
            studentBirthday: element.studentBirthday,
            studentPassword: element.studentPassword,
          }
          this.tableData.push(obj)
          obj = {}
        });


      }
    },
    async handleEdit(index, row) {
      this.dialogFormVisible = true;
      let result = await this.$API.getAllMajor();
      if (result.code == 200) {
        this.majorAll = result.data
        this.form = this.tableData.find((element) => {
          return row.studentId == element.studentId ? element : "";
        });
      } else {
        this.$message.error('获取失败')
      }


    },
    async close() {
      console.log(this.form);
      let resolve = await this.$API.updataStudent(this.form)
      if (resolve.code == 200) {
        this.$message.success('修改成功')
        this.getAllStduent()
      }
      this.dialogFormVisible = false;

    },
    async handleDelete(index, row) {
	let result =  await this.$API.delStduent(row.studentId)
      if(result.code ==200){
		  this.$message.success('删除成功')
		  this.getAllStduent();
	  }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.getAllStduent();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNum = val;
      this.getAllStduent();
    }
  },
};
</script>

<style lang="less"></style>