import { Component, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { Helper } from '../helper';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.scss']
})
export class RemarksComponent {

  selectorValue: string = "Tilføj bemærkninger";
  disableButton: boolean = true;
  dataRows: { nonEditable: string, editable: string, editableAttr: boolean }[] = [];
  dataTable: HTMLTableSectionElement | undefined = document.getElementById("dataTable")?.getElementsByTagName('tbody')[0]
  @ViewChild('selectElement') selectElement: ElementRef | undefined;
  @Output() jsonResult = new EventEmitter<string>();
  selectorValueChanged(): void {

    if (this.selectElement != null) {
      this.selectElement.nativeElement.selectedIndex = 0;
    }

    switch (this.selectorValue) {
      case 'Dimension':
        this.addDataRow("Længde(m)");
        this.addDataRow("Bredde(m)");
        this.addDataRow("Højde(m)");
        break;
      case "Weight":
        this.addDataRow("Vægt(kg)");
        break;
      case "userDefined":
        this.addDataRow("", "", true)
        break;
      default:
        break;
    }
  }
  addDataRow(nonEditable: string, editable: string = "", editableAttr: boolean = false) {
    this.dataRows.push({ nonEditable, editable, editableAttr });
    this.disableButton = this.checkTableForIllegalCharacters();
  }

  deleteTableRow(rowToDelete: string) {
    const index = this.dataRows.findIndex(x => x.nonEditable == rowToDelete)
    this.dataRows.splice(index, 1)
    this.disableButton = this.checkTableForIllegalCharacters();
  }

  
  // Builds a valid json structure
  logResult() {

    let json = `{"bemærkninger":{`;
    for (let i = 0; i < this.dataRows.length; i++) {

      // Checks for the last dataset in the array, if that's the case "," is not appended
      if (i + 1 == this.dataRows.length)
        json += `"${this.dataRows[i].nonEditable}": "${this.dataRows[i].editable}"`;
      else
        json += `"${this.dataRows[i].nonEditable}": "${this.dataRows[i].editable}",`;
    }
    json += "}}"
    this.jsonResult.emit(json);
  }
  isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  valueChanged(string: any) {
    this.disableButton =this.checkTableForIllegalCharacters();
  }
  checkTableForIllegalCharacters(): boolean {
    // Iterate through each row and column in the table
    for (const row of this.dataRows) {
      const cellValueFirst = row.nonEditable;
      const cellValueSecond = row.editable;
      if ((Helper.validateInput(cellValueFirst)) || (Helper.validateInput(cellValueSecond)))
        return true; // Found illegal character

    }

    return false; // no illegal character table is valid
  }
}
