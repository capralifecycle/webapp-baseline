#!/bin/sh

# Save size report of dist file grouped by file type.
# (We save both a human readable indented file and a CSV-file.)
(
  echo "ext      bytes  files"
  echo "------- ------ ------"
  find build -type f -print0 |
  xargs -0 du -b |
  awk '
    {
      x=$0
      sub(".*\\.", "", x)
      arr[x]+=$1
      files[x]+=1
    }
    END {
      for (i in arr) {
        printf "%-5s %8d %6d\n", i, arr[i], files[i]
      }
    }' |
  sort
)>"size-report.txt"

# The CSV-files are used by Jenkins to plot between jobs.

# by bytes
(
  find build -type f -print0 |
  xargs -0 du -b |
  awk '
    {
      x=$0
      sub(".*\\.", "", x)
      arr[x]+=$1
    }
    END {
      first=1
      for (ext in arr) {
        if (first != 1) {
          printf ","
        }
        first=0
        printf "%s", ext
      }
      printf "\n"

      first=1
      for (ext in arr) {
        if (first != 1) {
          printf ","
        }
        first=0
        printf "%s", arr[ext]
      }
      printf "\n"
    }'
)>"size-report-bytes.csv"

# by file count
(
  find build -type f -print0 |
  xargs -0 du -b |
  awk '
    {
      x=$0
      sub(".*\\.", "", x)
      arr[x]+=1
    }
    END {
      first=1
      for (ext in arr) {
        if (first != 1) {
          printf ","
        }
        first=0
        printf "%s", ext
      }
      printf "\n"

      first=1
      for (ext in arr) {
        if (first != 1) {
          printf ","
        }
        first=0
        printf "%s", arr[ext]
      }
      printf "\n"
    }'
)>"size-report-filecount.csv"
