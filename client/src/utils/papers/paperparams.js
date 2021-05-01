const paperparams = (def) => {
  const name = (def) => {
    switch (def) {
      case 'activites':
        return 'activité'
      case 'file':
        return 'fichier'
      case 'page':
        return 'page'
      case 'events':
        return 'evenement'

      default:
        break
    }
  }
  const alias = name(def)
  return {
    bottomButtonText: `Poster un ${alias}`,
    submitButtonText: `Je poste mon ${alias}`,
    updateModalTitle: `Confimation de modification`,
    updateModalText: `Souhaitez vous supprimer ce ${alias} ?`,
  }
}

export default paperparams
