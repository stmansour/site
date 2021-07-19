#!/usr/bin/perl

#  This perlscript is used to add an email address to a particular group in
#  mojo. It expects a post containing two parameters:
#
#       name  - the name of the person
#       email - the email address of the person
#
#  This script will attempt to add the email address to graymf
#
#  Steve Mansour
#  sman@stevemansour.com
#------------------------------------------------------------------------------

local ($buffer, $target, @pairs, $pair, $name, $value, %FORM);
$target = "graymf";
$ENV{'REQUEST_METHOD'} =~ tr/a-z/A-Z/;

if ($ENV{'REQUEST_METHOD'} eq "POST") {
   read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});
} else {
   $buffer = $ENV{'QUERY_STRING'};
}

# Split information into name/value pairs
@pairs = split(/&/, $buffer);

foreach $pair (@pairs) {
   ($name, $value) = split(/=/, $pair);
   $value =~ tr/+/ /;
   $value =~ s/%(..)/pack("C", hex($1))/eg;
   $FORM{$name} = $value;
}

$Name = $FORM{name};
$Email  = $FORM{email};

$cmd = "./add2distro.sh $Email \"$Name\"\n";
$code = `$cmd`;
$code =~ s/[^0-9]+//g;;
$htmlpage = "resp" . $code . ".html";
print "Content-type:text/html\r\n\r\n";
print "<html><head><title>Email List Response</title><meta http-equiv=\"refresh\" content=\"0; url=/subscribe/$htmlpage\"/></head><body>transferring...</body></html>"
