var gems = 0;
var currentActivity = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var GUI;
var menu;
var exitUI;

function dip2px(dips){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function newLevel() {
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(1);

            var menuBtn = new android.widget.TextView(ctx);
            menuBtn.setText(""+gems);
            menuBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    mainMenu();
                }
            }));
            menuBtn.setGravity(android.view.Gravity.CENTER);
            layout.addView(menuBtn);
            GUI = new android.widget.PopupWindow(layout,android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT,android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
            GUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
            GUI.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.CENTER,10,20);
        }catch(err){
            print("An error occured: " + err);
        }
    }}));
}

function mainMenu(){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            var menuLayout = new android.widget.LinearLayout(ctx);
            var menuScroll = new android.widget.ScrollView(ctx);
            var menuLayout1 = new android.widget.LinearLayout(ctx);
            menuLayout.setOrientation(1);
            menuLayout1.setOrientation(1);

            menuScroll.addView(menuLayout);
            menuLayout1.addView(menuScroll);

            var button = new android.widget.Button(ctx);
            button.setText("Starter Pack");
            button.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    starterPackGUI();
                }
            }));

            var button1 = new android.widget.Button(ctx);
            button1.setText("Starter2 Pack");
            button1.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    //starterPackGUI();
                    clientMessage("nothing");
                }
            }));
            menuLayout.addView(button);
            menuLayout.addView(button1);

            //Add more buttons in this section

            menu = new android.widget.PopupWindow(menuLayout1, ctx.getWindowManager().getDefaultDisplay().getWidth()/2, ctx.getWindowManager().getDefaultDisplay().getHeight());
            menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
            menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
        }catch(error){
            print("An error occured: " + error);
        }
    }}));
}

function exit(){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            var xLayout = new android.widget.LinearLayout(ctx);

            var xButton = new android.widget.Button(ctx);
            xButton.setText("x");
            xButton.setTextColor(android.graphics.Color.WHITE);
            xButton.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    exitUI.dismiss();
                    menu.dismiss();
                }
            }));
            xLayout.addView(xButton);

            exitUI = new android.widget.PopupWindow(xLayout, dip2px(40), dip2px(40));
            exitUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
            exitUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
        }catch(exception){
            print(exception);
        }
    }}));
}

function leaveGame(){
    RE.dismissGUI();
}

RE = {
	gemPickUp: function(gemType) {
		if(gemType == 1) {
			RE.addGems(1);
		}
		if(gemType == 2) {
			RE.addGems(10);
		}
		if(gemType == 3) {
			RE.addGems(50);
		}
		if(gemType == 4) {
			RE.addGems(100);
		}
	},
	addGems: function(m) {
		gems += m;
	},
	rmGems: function(m) {
		gems -= m;
	},
	errMsg: function() {
		clientMessage("Not Enough Gems To Buy");
	},
	dismissGUI: function() {
		var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    	ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
	        if(GUI != null){
	            GUI.dismiss();
	            GUI = null;
	        }
	        if(menu != null){
	            menu.dismiss();
	            menu = null;
	        }
	        if(exitUI != null){
	            exitUI.dismiss();
	            exitUI = null;
	        }
   	 	}}));
	},
	msg: function(msg) {
		clientMessage(msg);
	}
}

function starterPackGUI() {
	currentActivity.runOnUiThread(new java.lang.Runnable() {
		run: function() {
			try
			{
			var layout = new android.widget.LinearLayout(currentActivity);
			layout.setOrientation(android.widget.LinearLayout.VERTICAL);
			
			var scroll = new android.widget.ScrollView(currentActivity);
			scroll.addView(layout);
			
			var popup = new android.app.Dialog(currentActivity); 
			popup.setContentView(scroll);
			popup.setTitle("Starter Pack");

			var helpText = new android.widget.TextView(currentActivity);
			helpText.setText("Contain :");
			helpText.setTextColor(android.graphics.Color.CYAN);
			layout.addView(helpText);

			var companionText = new android.widget.TextView(currentActivity);
			companionText.setText("Anjeg\nanjeg\nanjeg\nanjeg.\n\n");
			layout.addView(companionText);

			var nameButton = new android.widget.Button(currentActivity); 
			nameButton.setText("BUY"); 
			nameButton.setOnClickListener(new android.view.View.OnClickListener() { 
				onClick: function()
				{ 
					RE.rmGems(100);
					popup.dismiss();
				}
			}); 
			layout.addView(nameButton); 

			var skinButton = new android.widget.Button(currentActivity); 
			skinButton.setText("Cancel"); 
			skinButton.setOnClickListener(new android.view.View.OnClickListener() { 
				onClick: function()
				{ 
					popup.dismiss();
				}
			}); 
			layout.addView(skinButton); 

			popup.show()
			
			}catch (err) {
				clientMessage("Error: " + err);
				clientMessage("Maybe GUI is not supported for your device. Report this error in the official minecraftforum.net thread, please.");
			}
		}
	});
}
