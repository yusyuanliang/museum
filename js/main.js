			Parse.initialize("19BDOaHH86XPBfrBbpr4skyC0efMHQQKRdYi2Dzt","zFnzw3ICGaSB9dVxHWr9tOTRzn15v79DU3l5Sv5Y");

			// 放全域變數

			// 1.
	 		var parseupdating="";

			// 2.找到parent.id
	 		var Story = Parse.Object.extend("Story");
	 		var story = new Story();
	 		story.fetch({
	 		    success: function(storyObject) {
	 		        var myStory = storyObject.toJSON();

	 		        for (key in myStory.results){
	 		            var singleStory = new Story();
	 		            singleStory.id = myStory.results[key].objectId;
	 		            console.log(singleStory.id);
	 		            this.showComments(singleStory);
	 		        }
	 		    }
	 		});


			
	//顯示資料
			function Project(){
				// 顯示故事
                
				var Story = Parse.Object.extend("Story");                
				var query = new Parse.Query(Story);
				var descending = Story.updatedAt;
				query.descending("updatedAt");
				query.notEqualTo("Story", "Text","File");
				
				query.find({
					success: function(results) {
					for (var i = 0; i < results.length; i++) {
					var object = results[i];

				  
					var profilePhoto = object.get("File");
					var url = (profilePhoto.url());
					// alert('url = ' + profilePhoto.url());                          
					var text = (object.get('Text') +'<br/>'); 
					var template = $('.template').html();

					template = template.replace("none", "block");
					template = template.replace("$_storyImage",  "<img src='" + url + "'>" );
					template = template.replace("$_storyMessage", text);
						
					template = template.replace("$_delbox", object.id);//刪除框變數
					template = template.replace("$_storyText", object.id);//編輯顯示

					template = template.replace("$_checkC1", object.id);//留言按鈕
					template = template.replace("$_inputCommendText", object.id);//留言輸入
					template = template.replace("$_inshowCommendText", object.id);//留言顯示
					
					template = template.replace("$_preComment", object.id); //先前留言
					
					template = template.replace("$_checkPC2", object.id); //顯示/隱藏先前留言
					template = template.replace("$_showcomment", object.id);//Load留言顯示
					template = template.replace("$_showcomment2", object.id);//Load留言顯示
					template = template.replace("$_user-message", object.id); //留言模板
					template = template.replace("$_user-message3", object.id);//留言模板2
					template = template.replace("$_commentText", ""); //清除"$_commentText"
					template = template.replace("$_commentText3", "");
					$('.frame').append(template);

					}

				},
				error: function(error) {
				alert("Error: " + error.code + " " + error.message);
				}

			});
				
			}
			

			function s(){

				var User = Parse.Object.extend("User");                
				var query = new Parse.Query(User);
				query.equalTo("User","File");
				
				

					query.first({
						success: function() {
							var usernamefile = object.get("File");
							var url = (usernamefile.url());
							var topimg = document.getElementById("topimg");
							
							topimg.innerHTML = "<img src='" + url + "'>";
							alert('url = ' + usernamefile.url());   

					},
					error: function(error) {
					alert("Error: " + error.code + " " + error.message);
					}

				});
			}
			
			// 顯示留言
	 		function showComments(parent){
	 		    var Comment = Parse.Object.extend("Comment");
	 		    var query = new Parse.Query(Comment);
	 		    query.equalTo("parent", parent,"objectId");

	 		    query.find({
	 		        success: function(comments) {
	 		        	// console.log 比對 parent.id
	 		            for(var key in comments)
	 		            {
	 		                console.log("parent.id - " + parent.id);
	 		                // alert("Comment - " + parent.id);

	 		            }
	 		            // 留言迴圈
	 		            for (var i = 0; i < comments.length; i++) {
	 		            	var object = comments[i];
	 		            	var content = (object.get("content") +'<br/>');

	 		            	if (i<=2) {
	 		            		
	 		            		// 3筆
	 		            		var a = $('.story-message3').html();
	 		            		a = a.replace("none", "block");	
	 		            		var showcontents3 = a = a.replace("$_commentText3", content);
	 		            		$('#'+ parent.id +'_cccc').prepend(showcontents3); 
	 		            	}

	 		            	else if(i>=2){

	 		            		// 多筆
	 		            		var b = $('.story-messages').html();
	 		            		b = b.replace("none", "block");
	 		            		var showcontents = b = b.replace("$_commentText", content);
	 		            		$('#'+ parent.id +'_ccc').prepend(showcontents);
	 		            		document.getElementById(parent.id + "_ccccc").innerHTML=  i - 2 +"則先前留言";
	 		            		
	 		            	}
	 		         
	 		            	
	 		            	
	 		        	}

	 		        }
	 		        
	 		    });
				


	 		}
	 		// 顯示/隱藏留言
	 		function a(object){

 				$("."+ object +"2").toggle("fast");
 				document.getElementById(object + "_ccccc").innerHTML=  "隱藏留言";
 				// document.getElementById("aa2").style.display = "block";
 				
			}

		
	// 新增故事
			function check(){
				var user = Parse.User.current();
				var fileUploadControl = $("#profilePhotoFileUpload")[0];
				if (fileUploadControl.files.length > 0) {
					var file = fileUploadControl.files[0];
					var name = "photo.jpg";
					var parseFile = new Parse.File(name, file);
					parseFile.save().then(function() {
						var Story = new Parse.Object("Story");
						var StoryACL = new Parse.ACL(Parse.User.current());//權限
						StoryACL.setPublicReadAccess(true);//權限
						Story.set("User", user);
						Story.set("File", parseFile);
						Story.set("Text", text.value);
						Story.setACL(StoryACL);//權限
						Story.save({
							success: function(Story) {
								document.getElementById("upload").innerHTML="故事上傳成功!";
								document.getElementById("st-tex").innerHTML= text.value;
								document.getElementById("st-pic").innerHTML=  result.innerHTML;
								document.getElementById("load1").style.display = "none";
								document.getElementById("mugshot").style.display = "none";
								document.getElementById("storypost").style.display = "block";  
								document.getElementById("$_showcommente").innerHTML= "  "; 
							},
							error: function(Story, error) {
								document.getElementById("upload").innerHTML="故事上傳失敗!";
							}
						});
						
					});
				}
			};

				  //設定大頭照
            function userphoto(){
				var user = Parse.User.current();
				var filephoto = $("#userphoto")[0];
				if (filephoto.files.length > 0) {
					var file = filephoto.files[0];
					var name = "userphoto.jpg";
					var parseFile = new Parse.File(name, file);
					parseFile.save().then(function() {
						var User = Parse.User.current();
						//var StoryACL = new Parse.ACL(Parse.User.current());//權限
				        //StoryACL.setPublicReadAccess(true);//權限
                        //User.set("User", user);
                        User.set("File", parseFile);
						//Story.set("Text", text.value);
						//User.setACL(StoryACL);//權限
						User.save({
							success: function(User) {
								document.getElementById("upload").innerHTML="照片上傳成功!";
//								document.getElementById("st-tex").innerHTML= text.value;
//								document.getElementById("st-pic").innerHTML=  result.innerHTML;
//								document.getElementById("load1").style.display = "none";
//								document.getElementById("mugshot").style.display = "none";
//  							document.getElementById("storypost").style.display = "block";  
//								document.getElementById("$_showcommente").innerHTML= "  "; 
							},
							error: function(User, error) {
								document.getElementById("upload").innerHTML="照片上傳失敗!";
							}
						});
						
					});
				}
			};	 			 
		   
	//編輯故事

			//顯示編輯的資料
			function Updating1(object){
				var Story = Parse.Object.extend("Story");
				var query = new Parse.Query(Story);
				query.equalTo("objectId", object);
				query.first({
					success: function(Story) {
						var text = Story.get('Text');
						document.getElementById("text2").innerHTML=text;
						parseupdating =  Story.id; //Story.get('object');
					},
					error: function(error) {
					}
				});
			}
			
			 
			//資料確定編輯
			function Updating2(object){
				var Story = Parse.Object.extend("Story");
				var query = new Parse.Query(Story);
				query.equalTo("objectId", parseupdating);
				query.first({
					success: function(Story) {
						Story.save(null, {
							success: function(Story) {
								Story.set("Text", text2.value);
								Story.save({
									success: function(Story) {
										window.location.href="main.html";
									},
									error: function(error) {
									}
								});
							},
							error: function(error) {
							}
						});
					},
					error: function(error) {
					}
				}); 
			}

	//刪除故事

			// 選擇刪除按鈕  
		  	function choosedel(object){
				var Story = Parse.Object.extend("Story");
				var styesno = $('.st-yes-no').html();
				$('.yesno').append(styesno);
				 
				var query = new Parse.Query(Story);
				query.equalTo("objectId", object);
				query.first({
					success: function(Story) {
						parseupdating =  Story.id; 
					},
					error: function(error) {
					}
				});
		  	}
			
			// 確定刪除
		  	function del(object){
			  	var Story = Parse.Object.extend("Story");
			  	var query = new Parse.Query(Story);
			   	query.equalTo("objectId", parseupdating);
			  	query.first({
				  	success: function(Story){
					  
					  	Story.destroy();
					  	window.location.href="main.html";   
				  	},
				  	error:function(objectId,error){
					  	alert("Error: " + error.code + " " + error.message);
				  	}
			  	});
		  	}

	// 留言故事

			function message(object){
				var Story = Parse.Object.extend("Story");
				var Comment = Parse.Object.extend("Comment");

				var user = Parse.User.current();
				
				var story = new Story();
				var comment = new Comment();
				var a = document.getElementById(object +"_c").value;
				var b = document.getElementById(object +"_cc").innerHTML;
				story.set("objectId", object);

				comment.set("content", a);

				comment.set("parent", story);
				
				comment.set("User", user);
				comment.save({
					success: function(Comment) {
						
					  	document.getElementById(object +"_c").value = "";
					  	$('#'+ object +'_cc').prepend(a + "<br>");
					  	
                    },
                    error: function(error) {
                    }
                });
            }
			//搜尋
            function search(input){ 
                //document.getElementById("display").innerHTML = input.value;
                var User = Parse.Object.extend("User");
                var query = new Parse.Query(User);
                query.notEqualTo("User", "username");
                query.find({
                    success: function(results) {
//                        alert("Successfully retrieved " + results.length + " username.");
//                        alert(object.id + ' - ' + object.get('username'));
                        for (var i = 0; i < results.length; i++) {
                            var object = results[i];
                            if (object) {
                               var username = object.get('username');
                                if(input.value == username){
                                   
                                   document.getElementById("display").innerHTML = input.value;
                                    parseupdating=object.id;
                                    return false;
                                    
                                }
                        
                            }
                            
                           
                        }
                         document.getElementById("display").innerHTML="";
                    },
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
                
            }
            
            //加好友
            function friend(){ 
                var curUser = Parse.User.current();
                var userQuery = new Parse.Query(Parse.User);
                userQuery.equalTo("objectId", parseupdating); 
            
                userQuery.first().then
                (
                    function(userToAdd)
                    {
                        var relation = curUser.relation("friend");

                        //add user to relation
                        relation.add(userToAdd);
                        curUser.save();
                    },
                    function(error)
                    {
                        console.log("error: " + error.message);
                    }
                );
            
           } 
            
            
            
