<template>
	<div class="form-source">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>会籍购买</span>
			</div>
			<div>
				客户：
				<el-button type="primary" @click="getUserInfo">客户资料</el-button>
			</div>
			<div class="form-block"></div>
			<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="会籍类型" prop="mbrshipId">
					<el-col :span="8">
						<el-input v-model="ruleForm.mbrshipId"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="会籍顾问" prop="consultant">
					<el-col :span="8">
					<el-input v-model="ruleForm.consultant"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-col :span="8">
					<el-input v-model="ruleForm.mobile"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="身份证号" prop="cert_id">
					<el-col :span="8">
					<el-input v-model="ruleForm.cert_id"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="备注" prop="remarks">
					<el-col :span="8">
						<el-input type="textarea" v-model="ruleForm.remarks"></el-input>
					</el-col>
				</el-form-item>
			</el-form>
			<div class="form-block"></div>
			<el-table :data="list" border stripe  v-loading="loading" element-loading-text="等 等等等等" >
				<el-table-column prop="chs_cus_id" label="客户姓名" width="100"></el-table-column>
				<el-table-column prop="chs_charge_type" label="收费类型" width="100"></el-table-column>
				<el-table-column prop="payable" label="应付" width="100"></el-table-column>
				<el-table-column prop="receivable" label="应收" width="100"></el-table-column>
				<el-table-column prop="receipts" label="实收" width="100"></el-table-column>
				<el-table-column prop="notreceived" label="未收" width="100"></el-table-column>
				<el-table-column prop="cheaper" label="优惠" width="100"></el-table-column>
				<el-table-column prop="discount" label="折扣" width="100"></el-table-column>
				<el-table-column prop="create_time" label="缴费日期" width="200"></el-table-column>
			</el-table>
			<div class="pagination-container">
				<el-pagination background @size-change="handleListSizeChange" @current-change="handleListCurrentPageChange" :current-page="dataQuery.page" :page-sizes="[10,20,30, 50]" :page-size="dataQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="usertotal">
				</el-pagination>
			</div>
		</el-card>

		<el-dialog title="客户信息" :visible.sync="dialogTableVisible">
			<div class="filter-container">
				<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="'标题'" v-model="listQuery.title">
				</el-input>
				<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{'搜索'}}</el-button>
			</div>
			<el-table :data="gridData" border stripe  v-loading="listLoading" element-loading-text="给我一点时间"  highlight-current-row
			          @current-change="handleCurrentChange">
				<el-table-column prop="name" label="姓名" width="100"></el-table-column>
				<el-table-column prop="chs_sex" label="性别" width="80"></el-table-column>
				<el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
				<el-table-column prop="chs_consultant" label="会籍顾问" width="100"></el-table-column>
				<el-table-column prop="chs_mbrship_id" label="已购会籍类型" width="200"></el-table-column>
			</el-table>
			<div class="pagination-container">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="dialogTableVisible = false">取 消</el-button>
			    <el-button type="primary" @click="handleDialog">选择</el-button>
			</span>
		</el-dialog>

		<el-card class="price-box-card">
			<div slot="header" class="clearfix">
				<span>计价显示</span>
			</div>
			<table class="table">
				<tbody>
					<tr>
						<td>应付款</td>
						<td>{{yingfu}}</td>
					</tr>
					<tr>
						<td>优惠额</td>
						<td>{{youhui}}</td>
					</tr>
					<tr>
						<td>打折</td>
						<td>{{dazhe}}</td>
					</tr>
					<tr>
						<td>应收款</td>
						<td>{{yingshou}}</td>
					</tr>
					<tr>
						<td>实收款</td>
						<td>{{shishou}}</td>
					</tr>
					<tr>
						<td>未收款</td>
						<td>{{weishou}}</td>
					</tr>
				</tbody>
			</table>
		</el-card>
		<el-card class="count-box-card">
			<div slot="header" class="clearfix">
				<span>结算操作</span>
			</div>
			<el-form :model="ruleFormPrice" ref="ruleFormPrice" label-width="100px" class="demo-ruleForm">
				<el-form-item label="收银优惠" prop="cheaper">
					<el-col :span="8">
						<el-input v-model="ruleFormPrice.cheaper" @change="changeyouhui"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="特殊申请">
					<el-select v-model="ruleFormPrice.is_special">
						<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="支付宝" prop="payment_alipay">
					<el-col :span="8">
						<el-input v-model="ruleFormPrice.payment_alipay" @change="changepayment"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="微信" prop="payment_weixin">
					<el-col :span="8">
						<el-input v-model="ruleFormPrice.payment_weixin" @change="changepayment"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="pos机" prop="payment_pos">
					<el-col :span="8">
						<el-input v-model="ruleFormPrice.payment_pos" @change="changepayment"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="现金" prop="payment_other">
					<el-col :span="8">
						<el-input v-model="ruleFormPrice.payment_other" @change="changepayment"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="备注" prop="pay_remarks">
					<el-col :span="8">
						<el-input type="textarea" v-model="ruleFormPrice.pay_remarks"></el-input>
					</el-col>
				</el-form-item>
				<el-button type="primary" @click="save">保存</el-button>
			</el-form>
		</el-card>
	</div>
</template>

<script>
import { fetchMbrshipPay, fetchMbrshipPayById, fetchPrice } from '@/api/pay'
// import waves from '@/directive/waves' // 水波纹指令

export default {
	  name: 'mbrship-pay',
	  // directives: {
	  //   waves
	  // },
	  data () {
	    return {
	      yingfu: null,
	      yingshou: null,
	      youhui: null,
	      dazhe: null,
	      shishou: null,
	      weishou: null,
	      selected: null,
	      tableKey: 0,
		  pricelist: null,
	      list: null,
	      total: null,
		  usertotal: null,
		  loading: false,
	      listLoading: true,
	      listQuery: {
	        page: 1,
	        limit: 20,
	        title: undefined
	      },
		    dataQuery: {
			    page: 1,
			    limit: 20,
			    title: undefined
		    },
		    ruleForm: {
			    mbrshipId: '',
			    consultant: '',
			    mobile: '',
			    cert_id: '',
			    site_type: '',
			    remarks: ''
		    },
		    ruleFormPrice: {
			    mbrshipId: '',
			    consultant: '',
			    mobile: '',
			    cert_id: '',
			    site_type: '',
			    remarks: ''
		    },
		    options: [
		    	{
	          value: 'is_special_0',
			        label: '否'
		        },
			    {
				    value: 'is_special_1',
				    label: '是'
			    }
		    ],
	      gridData: null,
	      dialogTableVisible: false
	    }
	  },
	  methods: {
	    getUserInfo () {
		  this.listLoading = true
	      fetchMbrshipPay().then(response => {
	        this.gridData = response.data
	        console.log(this.gridData)
		      this.total = response.recordsTotal
		      this.listLoading = false
	      })
	      this.dialogTableVisible = true
	    },
		  handleFilter () {
			  this.listQuery.page = 1
			  this.getUserInfo()
		  },
		  handleSizeChange (val) {
			  this.listQuery.limit = val
			  this.getUserInfo()
		  },
		  handleCurrentPageChange (val) {
			  this.listQuery.page = val
			  this.getUserInfo()
		  },
		  handleListSizeChange (val) {
			  this.dataQuery.limit = val
			  this.handleDialog()
		  },
		  handleListCurrentPageChange (val) {
			  this.dataQuery.page = val
			  this.handleDialog()
		  },
		  handleDialog () {
		      this.loading = true
		      this.ruleForm.mbrshipId = this.currentRow.chs_mbrship_id
		      this.ruleForm.consultant = this.currentRow.chs_consultant
		      this.ruleForm.mobile = this.currentRow.mobile
		      this.ruleForm.cert_id = this.currentRow.cert_id
		      this.ruleForm.remarks = this.currentRow.remarks
		      console.log(this.currentRow.mbr_id)
		      fetchMbrshipPayById().then(response => {
			  this.list = response.data
			  this.usertotal = response.recordsTotal
			  this.loading = false
		      })
		      fetchPrice().then(response => {
			  this.pricelist = response.data
			  var discount = this.pricelist.price * (1 - this.pricelist.discount)
			  this.yingshou = this.pricelist.price - discount
			  this.dazhe = this.pricelist.discount
			  this.yingfu = this.pricelist.price
			  this.youhui = '0'
			  this.shishou = '0'
			  this.weishou = this.yingshou
		      })
		      this.dialogTableVisible = false
		  },
		  handleCurrentChange (val) {
			  this.currentRow = val
	    },
	    changeyouhui () {
	      if (this.ruleFormPrice.cheaper > this.yingshou) {
	        this.$notify.error({
		          title: '错误',
		          message: '优惠金额不能大于应付款'
	        })
	      } else {
	        this.youhui = this.ruleFormPrice.cheaper
	        this.weishou = this.yingfu - this.ruleFormPrice.cheaper
	        this.yingshou = this.yingfu - this.ruleFormPrice.cheaper
	      }
	    },
	    changepayment () {
		    var payment_alipay = this.ruleFormPrice.payment_alipay ? Number(this.ruleFormPrice.payment_alipay) : 0
		    var payment_weixin = this.ruleFormPrice.payment_weixin ? Number(this.ruleFormPrice.payment_weixin) : 0
		    var payment_pos = this.ruleFormPrice.payment_pos ? Number(this.ruleFormPrice.payment_pos) : 0
		    var payment_other = this.ruleFormPrice.payment_other ? Number(this.ruleFormPrice.payment_other) : 0
		    console.log(payment_other)
		    var total = payment_alipay + payment_weixin + payment_pos + payment_other
		    this.shishou = total
		    this.weishou = this.yingshou - total
	    },
	    save () {
	      console.log(this.yingshou)
		    console.log(this.shishou)
		    console.log(this.weishou)
		    console.log(this.ruleFormPrice.cheaper)
		    console.log(this.ruleFormPrice.payment_alipay)
	    }
	  }
}
</script>

<style scoped>
	.form-source{
		padding: 24px;
	}
	.form-block{
		margin-top: 24px;
		height: 24px;
		border-top: 1px solid #ebebeb;
		border-radius: 3px;
		transition: .2s;
	}
	.price-box-card {
		float:left;
		margin-top: 24px;
		width: 480px;
	}
	.count-box-card {
		float:left;
		margin-top: 24px;
		margin-left:60px;
		width:480px;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		background-color: #fff;
		font-size: 14px;
		margin-bottom: 45px;
		line-height: 1.5em;
	}
	table td, table th {
		border-bottom: 1px solid #d8d8d8;
		padding: 15px;
		max-width: 250px;
	}
	table th {
		text-align: left;
		white-space: nowrap;
		color: #666;
		font-weight: 400;
	}
	table th {
		border-bottom: 1px solid #d8d8d8;
		padding: 15px;
		max-width: 250px;
	}
</style>
