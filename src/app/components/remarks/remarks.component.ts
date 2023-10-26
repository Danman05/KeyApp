import { Component, ViewChild, ElementRef, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Helper } from '../helper';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.scss']
})
export class RemarksComponent implements OnInit {

  selectorValue: string = "Tilføj bemærkninger"; // Value from remark select
  statusLabel: string | undefined; // Status label for remark table
  remarkTableInvalid: boolean = true; // Flag

  // Object array, each item in the array is an row in the table 
  dataRows: { nonEditable: string, editable: string, editableAttr: boolean }[] = [];
  // HTML Table
  dataTable: HTMLTableSectionElement | undefined = document.getElementById("dataTable")?.getElementsByTagName('tbody')[0]
  // HTML Select element
  @ViewChild('selectElement') selectElement: ElementRef | undefined;
  // EventEmitter for updating parent component
  @Output() jsonResult = new EventEmitter<string>();

  // Gets existing remarks from localstorage
  ngOnInit(): void {
    const existingDataRows = localStorage.getItem('remarks');
    if (existingDataRows !== null) {
      this.dataRows = JSON.parse(existingDataRows);
      this.jsonResult.emit(this.buildJson());
    }
  }

  selectorValueChanged(): void {
    if (this.selectElement != null)
      this.selectElement.nativeElement.selectedIndex = 0;

    // Adds values to the remark table depending on the select value
    switch (this.selectorValue) {
      case 'Dimension':
        this.addDataRow("Længde(m)");
        this.addDataRow("Bredde(m)");
        this.addDataRow("Højde(m)");
        break;
      case "Weight":
        this.addDataRow("Vægt(kg)");
        break;
      case "Brand":
        this.addDataRow("Mærke");
        break;
      case "userDefined":
        this.addDataRow("", "", true)
        break;
      default:
        break;
    }
  }

  // Adds a row to the remark table
  // Validate table changes
  addDataRow(nonEditable: string, editable: string = "", editableAttr: boolean = false) {
    this.dataRows.push({ nonEditable, editable, editableAttr });
    this.remarkTableInvalid = this.checkTableForIllegalCharacters();
  }

  // Deletes a row from the remark table
  // Validate table again because if an illegal row was removed the table could be valid
  deleteTableRow(rowToDelete: string) {
    const index = this.dataRows.findIndex(x => x.nonEditable == rowToDelete)
    this.dataRows.splice(index, 1)
    this.remarkTableInvalid = this.checkTableForIllegalCharacters();
    if (!this.remarkTableInvalid) {
      this.jsonResult.emit(this.buildJson());
    }
  }

  // Builds a valid json structure from the remarks table 
  buildJson(): string {
    let json = `{`;
    for (let i = 0; i < this.dataRows.length; i++) {
      // Checks for the last dataset in the array, if that's the case "," is not appended
      if (i + 1 == this.dataRows.length)
        json += `"${this.dataRows[i].nonEditable}": "${this.dataRows[i].editable}"`;
      else
        json += `"${this.dataRows[i].nonEditable}": "${this.dataRows[i].editable}",`;
    }
    json += "}"

    if (Helper.isJsonString(json)) {
      const dataRowsJSON = JSON.stringify(this.dataRows);
      localStorage.setItem("remarks", dataRowsJSON);
      return json;
    }
    else
      return ""
  }

  // Emits to the parent component
  // Remark table data is the parameter
  valueChanged(string: any) {
    if (!this.checkTableForIllegalCharacters()) {
      this.jsonResult.emit(this.buildJson());
    }
  }

  // Iterate through every cell of the table to verify values
  // Each cell value is compared with an regex pattern from the Helper class
  // Loop is broken if any illegal characters is found
  checkTableForIllegalCharacters(): boolean {
    for (const row of this.dataRows) {
      const cellValueFirst = row.nonEditable;
      const cellValueSecond = row.editable;
      if ((Helper.validateInput(cellValueFirst)) || (Helper.validateInput(cellValueSecond))) {
        this.setStatusLabel("ikke gyldig - udfyld felterne korrekt");
        return true; // Found illegal character
      }
      else {
        this.setStatusLabel("");
      }
    }
    return false; // no illegal characters
  }

  // sets the content of statusLabel
  setStatusLabel(content: string) {
    this.statusLabel = content
  }
}
