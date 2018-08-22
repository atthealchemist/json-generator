import * as vscode from 'vscode';

export default class TextDocumentContentProvider implements vscode.TextDocumentContentProvider {

    private eventOnDidChange = new vscode.EventEmitter<vscode.Uri>();

    public provideTextDocumentContent(uri: vscode.Uri): string {
        return this.createJsonGeneratorPreview();
    }

    get onDidChange(): vscode.Event<vscode.Uri> {
        return this.eventOnDidChange.event;
    }

    public update(uri: vscode.Uri) {
        this.eventOnDidChange.fire(uri);
    }

    private createJsonGeneratorPreview() {
        let editor = vscode.window.activeTextEditor;
        if( !(editor!.document.languageId === 'json') || !(editor!.document.languageId === 'js')) {
            return this.errorSnippet("Active editor doesn't contains a JSON or JavaScript");
        }
        return this.extractSnippet();
    }

    private extractSnippet(): string {
        let editor = vscode.window.activeTextEditor;
        let textContent = editor!.document.getText();
        let selectionStart = editor!.document.offsetAt(editor!.selection.anchor);
        let propertyStart = textContent.lastIndexOf('{', selectionStart);
        let propertyEnd = textContent.indexOf('}', selectionStart);

        if(propertyStart === -1 || propertyEnd === -1) {
            return this.errorSnippet("Cannot determine the json object");
        } else {
            return this.snippet(editor!.document, propertyStart, propertyEnd);
        }
    }

    private errorSnippet(error: string) {
        return `<body>${error}</body>`;
    }

    private snippet(document: vscode.TextDocument, propertyStart: number, propertyEnd: number): string {
        const properties = document.getText().slice(propertyStart + 1, propertyEnd);

        return `<style>
        #el {
            ${properties}
        }
    </style>
    <body>
        <div>Preview of the <a href="${encodeURI('command:extension.revealCssRule?' + JSON.stringify([document.uri, propertyStart, propertyEnd]))}">JSON properties</a></div>
        <hr>
        <div id="el">Lorem ipsum dolor sit amet, mi et mauris nec ac luctus lorem, proin leo nulla integer metus vestibulum lobortis, eget</div>
    </body>`;
    }

};
