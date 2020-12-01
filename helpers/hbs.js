const moment=require('moment');


module.exports={
    formatDate:function(date,format){
        return moment(date).format(format)
    },
    truncate:function(str,len){
        if(str.length > len && str.length >0){
            let new_str=str + ' ';
            new_str=str.substr(0,len) // from 0  to 150 
            new_str=str.substr(0,new_str.lastIndexOf(' ')) //from 0  to new_Str=0 to 150 .lastIndexOf(' ') // This will tell u num. of chars in new_str//
            new_str=new_str.length > 0 ? new_str:str.substr(0,len) // new_str is 0 to 150 
            return new_str + '...' 
        }
        return str
      
    },
    stripTags: function (input) {
        return input.replace(/(<([^>]+)>)/gi, " ");
      },
      editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
          if (floating) {
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
          } else {
            return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
          }
        } else {
          return ''
        }
      },
      select: function (selected, options) {
        return options
          .fn(this)
          .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
          )
          .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
          )
      },
      selectClass:function (errors){
        if(errors.name=== true){
          element.classList.add("is-Invalid")
        }
        else{
          element.classList.add(" ")
          
        }
      }

}