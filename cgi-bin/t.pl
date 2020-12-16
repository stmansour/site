#!/usr/bin/perl

$Name = "Steve Mansour";
$Email  = "sman\@stevemansour.com";

print "Content-type:text/html\r\n\r\n";
print "<html>";
print "<head>";
print "<title>Subscribe</title>";
print "</head>";
print "<body>";
print "<h2>Subscriber</h2>";
print "<p>\n";
print "name = $Name<br>\n";
print "email = $Email<br>\n";

$cmd = "./add2distro.sh $Email \"$Name\"\n";

print "cmd = <pre>$cmd</pre><br>\n";
$code = `$cmd`;
$code =~ s/[^0-9]+//g;
# print "return code = $code\n";
$htmlpage = "resp" . $code . ".html";
print "</p><p><pre></title><meta http-equiv=\"refresh\" content=\"0; url = /music/elist/$htmlpage\" /></head><body>transferring...</pre>";

print "</p>";
print "</body>";
print "</html>\n";
