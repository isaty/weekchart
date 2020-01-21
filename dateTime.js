const dateTime={
    week:function(date)
    {
        const now=new Date().getTime()
        const then=new Date().getTime()
        const week =Number((now-then)/(1000 * 3600 * 24))/7
        return Number(week)
    },

}
module.exports=dateTime