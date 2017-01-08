<!DOCTYPE html>
<html>
<body>

<?php
echo "我的第一段 PHP 脚本！";
$color="red";
echo "My car is " . $color . "<br>";

$x=5; // 全局作用域

function myTest() {
  $y=10; // 局部作用域
  echo "<p>测试函数内部的变量：</p>";
  echo "变量 x 是：$x";
  echo "<br>";
  echo "变量 y 是：$y";
} 

myTest();

$txt1="Learn PHP";
$txt2="W3School.com.cn";
$cars=array("Volvo","BMW","SAAB");

echo $txt1;
echo "<br>";
echo "Study PHP at $txt2";
echo "My car is a {$cars[0]}";

echo $_SERVER['SERVER_ADDR'];
echo "<br>";
echo $_SERVER['HTTP_ACCEPT_CHARSET'];
echo "<br>";
echo $_SERVER['HTTP_HOST'];
echo "<br>";
echo $_SERVER['REMOTE_ADDR'];
echo "<br>";
echo $_SERVER['HTTP_USER_AGENT'];
echo "<br>";
echo $_SERVER['SCRIPT_URI'];
$name = $_REQUEST['fname']; 
echo $name;

if($_GET['action'] == 'ok'){
$contents = $_POST['contents'];
echo $contents;
}
?>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
Name: <input type="text" name="fname">
Sub<input type="submit">
</form>
<br>

<form name="form1" method="post" action="index.php?action=ok">
<select name="contents">
<option value="1">A</option>
<option value="2">B</option>
<option value="3">C</option>
</select>
<input type="submit" value="提交">
</form>
<br>
<!--Javascript Try-->
<script language="JavaScript">
	document.write("Hello World!");
	document.write("<h1>This is a heading</h1>");
	function jsget(){
		x=document.getElementById("demo")  //查找元素
		tmp=x.innerHTML;
		x.innerHTML=tmp+"Hello JavaScript";    //改变内容
		x2=document.getElementById("demo2")  //查找元素
		x2.innerHTML="Hello 2";    //改变内容
		}
	function jsadd(){// Add node!!!
		var para=document.createElement("p");
		var node=document.createTextNode("New paragraph");
		para.appendChild(node);
		var element=document.getElementById("demo2");
		element.appendChild(para);
		}
	</script>
<textarea id="demo">Good</textarea>
<p id="demo2">
JavaScript 能改变 HTML 元素的内容。
</p>
<button type="button" onclick="jsget()">点击这里</button>
<button type="button" onclick="jsadd()">Add Node</button>
<script>
document.write(Date());
</script>
</body>
</html>
