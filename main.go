package main

import (
	"fmt"
	"net/http"

	"github.com/shirou/gopsutil/process"
	webview "github.com/webview/webview_go"
)

const URL = "http://localhost:5555"

func createServer() {
	http.ListenAndServe(":5555", nil)
}

func main() {
	folder := http.FileServer(http.Dir("frontend/dist/"))
	http.Handle("/", http.StripPrefix("/", folder))

	go createServer()

	w := webview.New(true)
	defer w.Destroy()
	w.SetTitle("Process Manager")
	w.SetSize(800, 600, webview.Hint(1))
	w.Navigate("http://localhost:5555")

	type pResult struct {
		Pid      int32   `json:"pid"`
		Exe      string  `json:"exe"`
		Cpu      float64 `json:"cpu"`
		Memory   float32 `json:"memory"`
		Username string  `json:"username"`
	}

	type pResponse struct {
		Result []*pResult
	}

	w.Bind("goProcess", func() pResponse {
		list, err := process.Processes()
		if err != nil {
			fmt.Println(err)
		}

		var response pResponse

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

			//Processin parentlarini al ve bir process tree olustur.
			response.Result = append(response.Result, &pResult{
				Pid:      list[x].Pid,
				Exe:      n,
				Memory:   m,
				Cpu:      c,
				Username: u,
			})
		}
		return response

	})

	w.Run()

}
