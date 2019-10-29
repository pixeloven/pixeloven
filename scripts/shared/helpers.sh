 #!/bin/bash

#
# Compares a string with a substring to see if it is contained with in it.
#
contains() {
    string="$1";
    substring="$2";
    if test "${string#*$substring}" != "$string";
    then
        return 0; # $substring is in $string
    else
        return 1; # $substring is not in $string
    fi
}

#
# Excepts a single argument for capturing to output
#
capture() {
    status=$?;
    # @todo should be able to silence this. Also only ouput if we have something to capture;
    if [ ! -z "$1" ]
    then
        echo $1 >> $OUTPUT_STREAM_FILE;
    fi
    return $status;
}
