'use babel';

import SoftwareFactoryAtomView from './software-factory-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  softwareFactoryAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.softwareFactoryAtomView = new SoftwareFactoryAtomView(state.softwareFactoryAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.softwareFactoryAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'software-factory-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.softwareFactoryAtomView.destroy();
  },

  serialize() {
    return {
      softwareFactoryAtomViewState: this.softwareFactoryAtomView.serialize()
    };
  },

  toggle() {
    console.log('SoftwareFactoryAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
