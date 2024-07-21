package main

import (
	"fmt"
	"net/http"

	"github.com/shirou/gopsutil/process"
	webview "github.com/webview/webview_go"
)

const URL = "http://localhost:5555"

type pResult struct {
	Pid       int32     `json:"pid"`
	Exe       string    `json:"exe"`
	Cpu       float64   `json:"cpu"`
	Memory    float32   `json:"memory"`
	Username  string    `json:"username"`
	Childrens []pResult `json:"childrens"`
}

type pResponse struct {
	Result []*pResult
}

type processDetailResponse struct {
	Result *pResult
}

func createServer() {
	http.ListenAndServe(":5555", nil)
}

func processesDetail() pResponse {
	list, err := process.Processes()
	if err != nil {
		fmt.Println(err)
	}
	var result pResponse
	for x := range list {
		n, err := list[x].Name()

		if err != nil {
			fmt.Println("Connot find process name!")
		}

		m, err := list[x].MemoryPercent()

		if err != nil {
			fmt.Println("Connot find process memory usage!")
		}

		c, err := list[x].CPUPercent()

		if err != nil {
			fmt.Println("Connot find process cpu usage!")
		}

		u, err := list[x].Username()

		if err != nil {
			fmt.Println("Connot find process username!")
		}

		// childs, err := list[x].Children()

		// if err != nil {
		// 	fmt.Println("Connot find process childs!")
		// }

		// for child := range childs {

		// }

		//Processin parentlarini al ve bir process tree olustur.
		result.Result = append(result.Result, &pResult{
			Pid:      list[x].Pid,
			Exe:      n,
			Memory:   m,
			Cpu:      c,
			Username: u,
		})
	}
	return result
}

func main() {
	folder := http.FileServer(http.Dir("frontend/dist/"))
	http.Handle("/", http.StripPrefix("/", folder))

	go createServer()

	w := webview.New(true)
	defer w.Destroy()
	w.SetTitle("Process Manager")
	w.SetSize(900, 600, webview.Hint(1))
	w.Navigate("http://localhost:5555")

	w.Bind("goProcess", func() pResponse {
		return processesDetail()
	})

	w.Bind("processDetail", func(pid int32) processDetailResponse {
		p := processesDetail()
		var result processDetailResponse

		for x := range p.Result {
			if p.Result[x].Pid == pid {
				result.Result = &pResult{
					Pid:       p.Result[x].Pid,
					Exe:       p.Result[x].Exe,
					Cpu:       p.Result[x].Cpu,
					Memory:    p.Result[x].Memory,
					Username:  p.Result[x].Username,
					Childrens: p.Result[x].Childrens,
				}
				break
			}
		}
		return result
	})

	w.Run()

}
