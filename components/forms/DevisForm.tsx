'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Send } from 'lucide-react'
import GoldDivider from '@/components/shared/GoldDivider'

const schema = z.object({
  typeProjet: z.string().min(1, 'Sélectionnez un type de projet'),
  secteur: z.string().min(1, 'Sélectionnez un secteur'),
  espace: z.string().min(1, 'Précisez l\'espace concerné'),
  surface: z.string().optional(),
  delai: z.string().optional(),
  budget: z.string().optional(),
  nom: z.string().min(2, 'Votre nom est requis'),
  telephone: z.string().min(8, 'Numéro de téléphone invalide'),
  email: z.string().email('Adresse email invalide'),
  ville: z.string().min(2, 'Ville requise'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const typesProjets = ['Construction neuve', 'Rénovation', 'Agencement commercial', 'Projet hôtelier', 'Établissement de soins', 'Autre']
const secteursForm = ['Résidentiel', 'Hôtellerie', 'Healthcare', 'Commercial', 'Institutionnel', 'Espaces de travail']
const espaces = ['Cuisine', 'Salle de bain', 'Salon / Séjour', 'Espace d\'accueil', 'Bureau', 'Salle de conférence', 'Espace restauration', 'Autre']
const surfaces = ['Moins de 20 m²', '20 – 50 m²', '50 – 100 m²', '100 – 300 m²', 'Plus de 300 m²']
const delais = ['Moins de 3 mois', '3 – 6 mois', '6 mois – 1 an', 'Plus d\'un an', 'Pas encore défini']
const budgets = ['Moins de 10 000 TND', '10 000 – 30 000 TND', '30 000 – 100 000 TND', 'Plus de 100 000 TND', 'À définir ensemble']

const STEPS = ['Votre projet', 'Détails', 'Coordonnées']

export default function DevisForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const inputClass =
    'w-full bg-transparent border border-gris-fume focus:border-or-champagne text-blanc-pur font-sans font-light text-sm px-4 py-3 outline-none transition-colors duration-300 placeholder:text-blanc-pur/30'
  const labelClass = 'block font-sans text-[0.6rem] font-medium tracking-[0.15em] uppercase text-blanc-pur/60 mb-2'
  const errorClass = 'font-sans text-xs text-red-400 mt-1'

  const nextStep = async () => {
    const fields: (keyof FormData)[][] = [
      ['typeProjet', 'secteur'],
      ['espace'],
      ['nom', 'telephone', 'email', 'ville'],
    ]
    const valid = await trigger(fields[step])
    if (valid) setStep((s) => s + 1)
  }

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200))
    console.log('Devis form:', data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 border border-or-champagne flex items-center justify-center mx-auto mb-8">
          <Check size={24} strokeWidth={1.5} className="text-or-champagne" />
        </div>
        <h3 className="font-serif font-light text-blanc-pur text-3xl mb-4">
          Demande envoyée.
        </h3>
        <p className="font-sans font-light text-blanc-pur/60 text-sm max-w-md mx-auto">
          Nous avons bien reçu votre demande de devis. Notre équipe vous contacte
          sous 48 heures ouvrées.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-0 mb-12">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 flex items-center justify-center border transition-colors duration-300 ${
                  i <= step
                    ? 'border-or-champagne text-or-champagne'
                    : 'border-gris-fume text-blanc-pur/60'
                }`}
              >
                {i < step ? (
                  <Check size={14} strokeWidth={1.5} />
                ) : (
                  <span className="font-sans text-xs">{i + 1}</span>
                )}
              </div>
              <span
                className={`font-sans text-[0.6rem] tracking-[0.12em] uppercase transition-colors duration-300 hidden sm:block ${
                  i <= step ? 'text-or-champagne' : 'text-blanc-pur/30'
                }`}
              >
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-4 transition-colors duration-500 ${
                  i < step ? 'bg-or-champagne' : 'bg-gris-fume'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <label className={labelClass}>Type de projet *</label>
                <select {...register('typeProjet')} className={inputClass}>
                  <option value="">Sélectionner</option>
                  {typesProjets.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.typeProjet && <p className={errorClass}>{errors.typeProjet.message}</p>}
              </div>

              <div>
                <label className={labelClass}>Secteur *</label>
                <select {...register('secteur')} className={inputClass}>
                  <option value="">Sélectionner</option>
                  {secteursForm.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.secteur && <p className={errorClass}>{errors.secteur.message}</p>}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <label className={labelClass}>Espace concerné *</label>
                <select {...register('espace')} className={inputClass}>
                  <option value="">Sélectionner</option>
                  {espaces.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
                {errors.espace && <p className={errorClass}>{errors.espace.message}</p>}
              </div>

              <div>
                <label className={labelClass}>Surface estimée</label>
                <select {...register('surface')} className={inputClass}>
                  <option value="">Sélectionner (optionnel)</option>
                  {surfaces.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass}>Délai souhaité</label>
                <select {...register('delai')} className={inputClass}>
                  <option value="">Sélectionner (optionnel)</option>
                  {delais.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass}>Budget indicatif</label>
                <select {...register('budget')} className={inputClass}>
                  <option value="">Sélectionner (optionnel)</option>
                  {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Nom & Prénom *</label>
                  <input
                    {...register('nom')}
                    type="text"
                    placeholder="Jean Dupont"
                    className={inputClass}
                  />
                  {errors.nom && <p className={errorClass}>{errors.nom.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Téléphone *</label>
                  <input
                    {...register('telephone')}
                    type="tel"
                    placeholder="+216 XX XXX XXX"
                    className={inputClass}
                  />
                  {errors.telephone && <p className={errorClass}>{errors.telephone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="vous@exemple.com"
                    className={inputClass}
                  />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Ville *</label>
                  <input
                    {...register('ville')}
                    type="text"
                    placeholder="Tunis"
                    className={inputClass}
                  />
                  {errors.ville && <p className={errorClass}>{errors.ville.message}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass}>Message (optionnel)</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Décrivez votre projet en quelques mots…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <p className="font-sans font-light text-xs text-blanc-pur/40">
                En soumettant ce formulaire, vous acceptez que vos données soient utilisées
                pour traiter votre demande. Consulter notre{' '}
                <a href="/politique-confidentialite" className="text-or-champagne/70 hover:text-or-champagne transition-colors">
                  politique de confidentialité
                </a>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-10 pt-8 border-t border-gris-fume">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn-ghost"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              Retour
            </button>
          ) : (
            <div />
          )}

          {step < STEPS.length - 1 ? (
            <button type="button" onClick={nextStep} className="btn-primary">
              Suivant
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours…' : 'Envoyer la demande'}
              <Send size={14} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
