#!/bin/bash

#------------------------------------------------------------------------------
#  usage - describe this program and how to use it
#------------------------------------------------------------------------------
usage() {
	cat <<EOF

SYNOPSIS
	$0 [-c ] email name

	This script provides a simple command to manage members of a mojo email
	group. You provide 2 arguments on the command line: an email address and
	an associated name. The script will contact the mojo server and do the
    following:

    -   if the email address is not found, it will be added along with the
        name and the new entry will be added to the email group ${GROUPNAME}.

    -   if the email address is found in the database it will be added to the
        email group ${GROUPNAME}.

    The return values are

      CODE  STATUS   DESCRIPTION
      ----  -------  ------------------------------------------
         1  success  this was a new user, successfully added
         2  success  existing user, already a member
         3  success  existing user, added as a member
      1000  error    email address required
      1001  error    email address improperly formatted
      1002  error    group name must be supplied
      1003  error    group could not be found
         0  error    <<a system error>>



OPTIONS
	-c  Show each command that was executed.

EXAMPLES
    $0  jdoe@example.com  "John Doe"

EOF
}

#------------------------------------------------------------------------------
#  encodeRequest is just like encodeURI except that it saves the output
#      into the file ${REQFILE}
#
#  INPUTS
#  $1  The string to encode
#
#  RETURNS
#      nothing, but the encoded string will be in the file named ${REQFILE}
#------------------------------------------------------------------------------
encodeRequest() {
  local string="${1}"
  local strlen=${#string}
  local encoded=""
  local pos c o

  for (( pos=0 ; pos<strlen ; pos++ )); do
     c=${string:$pos:1}
     case "$c" in
        [-_.~a-zA-Z0-9] ) o="${c}" ;;
        * )               printf -v o '%%%02x' "'$c"
     esac
     encoded+="${o}"
  done
  echo "${encoded}" > ${REQFILE}
}

#------------------------------------------------------------------------------
#  init - initialize everything to a known state
#------------------------------------------------------------------------------
init() {
    SHOWCOMMAND=0
    SERVER="https://mojo.airoller.com/v1/addtogroup"
    REQFILE="$(mktemp)"
    LOG="$(mktemp)"
    ERRORS="$(mktemp)"
    GROUP="graymf"
}

#------------------------------------------------------------------------------

init
#--------------------------------------
# Deal with any command line flags...
#--------------------------------------
while getopts "c" o; do
	# echo "o = ${o}"
	case "${o}" in
		c | C)
			SHOWCOMMAND=1
			echo "SHOWCOMMAND"
			;;
		*) 	usage
			exit 1
			;;
	esac
done
shift $((OPTIND-1))

EMAIL=$1
NAME=$2

encodeRequest "{\"cmd\":\"save\",\"name\":\"${NAME}\",\"email\": \"${EMAIL}\",\"group\":\"${GROUP}\" }"
CMD="curl -s -X POST ${SERVER} -H \"Content-Type: application/json\" -d @${REQFILE}"

if [ "${SHOWCOMMAND}" = "1" ]; then
    # echo "EMAIL = ${EMAIL}"
    # echo "NAME = ${NAME}"
    # echo "REQFILE = ${REQFILE}"
    # echo "LOG = ${LOG}"
    # echo "ERRORS = ${ERRORS}"
    echo "$CMD"
fi

${CMD} | python -m json.tool >${LOG} 2>>${ERRORS}

code=$(grep code ${LOG} | sed 's/"code": //' | sed 's/,//' | sed 's/ *//')

msg=$(grep message ${LOG} | sed 's/"message": //' | sed 's/,//')

echo "${code}"

rm -f ${LOG} ${ERRORS} ${REQFILE}
