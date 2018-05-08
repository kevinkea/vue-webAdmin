<template>
	<div class="app-container calendar-list-container">
		<div class="filter-container">
			<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="'标题'" v-model="listQuery.title">
			</el-input>
			<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{'搜索'}}</el-button>
			<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{'添加'}}</el-button>
			<el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{'导出'}}</el-button>
		</div>

		<el-table stripe :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
		          style="width: 100%">
			<el-table-column :label="'门店名称'" >
				<template slot-scope="scope">
					<span>{{scope.row.chs_group_id}}</span>
				</template>
			</el-table-column>
			<el-table-column :label="'组织id'">
				<template slot-scope="scope">
					<span>{{scope.row.chs_group_id}}</span>
				</template>
			</el-table-column>
			<el-table-column :label="'地区'">
				<template slot-scope="scope">
					<span>{{scope.row.chs_area_id}}</span>
				</template>
			</el-table-column>
			<el-table-column :label="'电话'">
				<template slot-scope="scope">
					<span>{{scope.row.phone}}</span>
				</template>
			</el-table-column>
			<el-table-column :label="'地址'">
				<template slot-scope="scope">
					<span>{{scope.row.address}}</span>
				</template>
			</el-table-column>
			<el-table-column :label="'备注'" >
				<template slot-scope="scope">
					<span>{{scope.row.remarks}}</span>
				</template>
			</el-table-column>
			<el-table-column :label="'操作'" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{'编辑'}}</el-button>
					<el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{'删除'}}
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="pagination-container">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>

		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
				<el-form-item :label="'门店名称'" prop="name">
					<el-input v-model="temp.name"></el-input>
				</el-form-item>
				<el-form-item :label="'组织'" prop="group_id">
					<el-select class="filter-item" v-model="temp.group_id" placeholder="请选择">
						<el-option v-for="(item,key) in  groupData" :key="key" :label="item" :value="key">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="'地区'" prop="area_id">
					<el-select class="filter-item" v-model="temp.area_id" placeholder="请选择">
						<el-option v-for="(item,key) in  areaData" :key="key" :label="item" :value="key">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="'电话'">
					<el-input v-model="temp.phone"></el-input>
				</el-form-item>
				<el-form-item :label="'地址'">
					<el-input v-model="temp.address"></el-input>
				</el-form-item>
				<el-form-item :label="'备注'">
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="" v-model="temp.remarks">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">{{'取消'}}</el-button>
				<el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{'确认'}}</el-button>
				<el-button v-else type="primary" @click="updateData">{{'确认'}}</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { createCorp, updateCorp, fetchCorpList, fetchArea, fetchGroup } from '@/api/sys'
import waves from '@/directive/waves' // 水波纹指令

export default {
	  name: 'corpManage',
	  directives: {
	    waves
	  },
	  data () {
	    return {
	      tableKey: 0,
	      list: null,
	      total: null,
	      listLoading: true,
	      listQuery: {
	        page: 1,
	        limit: 20,
	        title: undefined
	      },
	      temp: {
	        name: '',
	        group_id: '',
		    area_id: '',
		    phone: '',
		    address: '',
	        remarks: ''
	      },
	      dialogFormVisible: false,
	      dialogStatus: '',
	      textMap: {
	        update: '编辑',
	        create: '创建'
	      },
		  areaData: [],
		  groupData: [],
	      rules: {
	        area_id: [{ required: true, message: '地区不能为空', trigger: 'change' }],
	        group_id: [{ required: true, message: '组织id不能为空', trigger: 'change' }],
	        name: [{ required: true, message: '门店名称不能为空', trigger: 'blur' }]
	      },
	      downloadLoading: false
	    }
	  },
	  created () {
	    this.getList()
	  },
	  methods: {
	    getList () {
	      this.listLoading = true
	      fetchCorpList(this.listQuery).then(response => {
	        this.list = response.data
	        this.total = response.recordsTotal
	        this.listLoading = false
	      })
	    },
	    handleFilter () {
	      this.listQuery.page = 1
	      this.getList()
	    },
	    handleSizeChange (val) {
	      this.listQuery.limit = val
	      this.getList()
	    },
	    handleCurrentChange (val) {
	      this.listQuery.page = val
	      this.getList()
	    },
	    handleModifyStatus (row, status) {
	      this.$message({
	        message: '操作成功',
	        type: 'success'
	      })
	      row.status = status
	    },
	    resetTemp () {
	      this.temp = {
		    name: '',
		    group_id: '',
		    area_id: '',
		    phone: '',
		    address: '',
		    remarks: ''
	      }
	    },
	    handleCreate () {
	      this.resetTemp()
	      this.dialogStatus = 'create'
	      this.dialogFormVisible = true
		  this.handleFetchArea()
		  this.handleFetchGroup()
	      this.$nextTick(() => {
	        this.$refs['dataForm'].clearValidate()
	      })
	    },
	    createData () {
	      this.$refs['dataForm'].validate((valid) => {
	        if (valid) {
	          createCorp(this.temp).then(() => {
	            // this.list.unshift(this.temp)
	            // console.log(this.list)
	            this.dialogFormVisible = false
	            this.$notify({
	              title: '成功',
	              message: '创建成功',
	              type: 'success',
	              duration: 2000
	            })
	          })
	        }
	      })
	    },
	    handleUpdate (row) {
	      this.temp = Object.assign({}, row) // copy obj
	      this.dialogStatus = 'update'
	      this.dialogFormVisible = true
	      this.$nextTick(() => {
	        this.$refs['dataForm'].clearValidate()
	      })
	    },
	    updateData () {
	      this.$refs['dataForm'].validate((valid) => {
	        if (valid) {
	          console.log(this.temp)
	          updateCorp(this.temp).then(() => {
	            // for (const v of this.list) {
	            //   if (v.id === this.temp.id) {
	            //     const index = this.list.indexOf(v)
	            //     this.list.splice(index, 1, this.temp)
	            //     break
	            //   }
	            // }
	            // console.log(this.list)
	            this.dialogFormVisible = false
	            this.$notify({
	              title: '成功',
	              message: '更新成功',
	              type: 'success',
	              duration: 2000
	            })
	          })
	        }
	      })
	    },
	    handleDelete (row) {
	      this.$notify({
	        title: '成功',
	        message: '删除成功',
	        type: 'success',
	        duration: 2000
	      })
	      const index = this.list.indexOf(row)
	      this.list.splice(index, 1)
	    },
	    handleFetchArea () {
	    	fetchArea().then(response => {
	    		this.areaData = response.data
			    console.log(this.areaData)
		    })
	    },
		  handleFetchGroup () {
			  fetchGroup().then(response => {
				  this.groupData = response.data
				  console.log(this.areaData)
			  })
		  },
	    handleDownload () {
	      this.downloadLoading = true
	      // import('@/vendor/Export2Excel').then(excel => {
	      // 	const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
	      // 	const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
	      // 	const data = this.formatJson(filterVal, this.list)
	      // 	excel.export_json_to_excel(tHeader, data, 'table-list')
	      // 	this.downloadLoading = false
	      // })
	    }
	  }
}
</script>
