
run:
	cd frontend && npm run build && cd .. && go build && ./process-manager-go

clear:
	cd frontend && rm -rf ./dist && cd .. && rm ./process-manager-go