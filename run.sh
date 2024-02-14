#! /usr/bin/env bash

while getopts 'hmdki' opt; do
  case "$opt" in
    h)
      echo "Kjører opp utvikler miljøet. Bruk: $(basename $0) [-h] [-m] [-d] [-k] [-i]"
      echo "  -h denne hjelpeteksten"
      echo "  -m kjører mocks-server"
      echo "  -d kjører opp siden i dev-modus"
      echo "  -k drep serveren som kjører i bakgrunnen og så kjør opp siden med mocks"
      echo "  -i installerer avhengigheter"
      exit 0
      ;;

    m)
    bun run mocks
      ;;

    d)
      bun run dev
      ;;

    k)
      killall next-server
      ;;
    i)
      bun install
      exit 0
      ;;

      ?)
        echo -e "Ugyldig argument. Bruk: $(basename $0) [-h] [-m] [-d] [-k] [-i]"
        exit 1
        ;;
  esac
done
shift "$(($OPTIND -1))"

if [ $? -eq 0 ]
then
  # kjør opp frontend
  bun dev & bun run mocks
fi
