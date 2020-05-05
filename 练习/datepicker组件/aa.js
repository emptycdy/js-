(function(){
	var datepicker={};
	datepicker.getMonthData=function(year,month){
		var ret=[];
		if(!year&&!month){
			var today=new Date();
			year=today.getFullYear();
			month=today.getMonth()+1;
		}
		var firstDay=new Date(year,month-1,1);
		var firstDayWeekDay=firstDay.getDay();

		year=firstDay.getFullYear();
		month=firstDay.getMonth()+1;
		/*上月最后一天*/
		var lastDayOfLastMonth=new Date(year,month-1,0);
		var lastDateOfLastMonth=lastDayOfLastMonth.getDate();
		/*第一行需要显示多少个上月日期*/
		var preMonthDayCount=firstDayWeekDay;
		//当月最后一天
		var lastDay=new Date(year,month,0);
		var lastDate=lastDay.getDate();
		/*获取当月每一天*/
		for(i=0;i<7*6;i++){
			var date=i+1-preMonthDayCount;
			var showDate=date;
			var thisMonth=month;

				//上月
			if(date<=0){
				thisMonth=month-1;
				showDate="";
			}else if(date>lastDate){
				//下月
				thisMonth=month+1;
				showDate="";
			}
			if(thisMonth===0) thisMonth=12;
			if (thisMonth===13) thisMonth=1;
			ret.push({
				month:thisMonth,
				date:date,
				showDate:showDate
			});
		}
		return {
			year:year,
			month:month,
			days:ret
		};
	};
	window.datepicker=datepicker;
})();